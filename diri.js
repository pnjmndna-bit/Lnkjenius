const form = document.getElementById("dataForm");

const photoInput = document.getElementById("photoInput");
const photoPreview = document.getElementById("photoPreview");

const popup = document.getElementById("selectPopup");
const title = document.getElementById("selectTitle");
const search = document.getElementById("selectSearch");
const list = document.getElementById("selectList");

const provinsiText = document.getElementById("provinsiText");
const kabupatenText = document.getElementById("kabupatenText");
const kecamatanText = document.getElementById("kecamatanText");
const jkText = document.getElementById("jkText");

const hariText = document.getElementById("hariText");
const bulanText = document.getElementById("bulanText");
const tahunText = document.getElementById("tahunText");

const API = "https://www.emsifa.com/api-wilayah-indonesia/api";

let provinsiData = [];
let kabupatenData = [];
let kecamatanData = [];

let selectedProvinsi = null;
let selectedKabupaten = null;
let selectedKecamatan = null;
let selectedJk = null;

let selectedHari = null;
let selectedBulan = null;
let selectedTahun = null;

const genderData = [
    { name:"Laki-laki" },
    { name:"Perempuan" }
];

const hariData = Array.from({length:31}, (_,i)=>({
    name:String(i + 1).padStart(2,"0")
}));

const bulanData = [
    {name:"Januari", value:"01"},
    {name:"Februari", value:"02"},
    {name:"Maret", value:"03"},
    {name:"April", value:"04"},
    {name:"Mei", value:"05"},
    {name:"Juni", value:"06"},
    {name:"Juli", value:"07"},
    {name:"Agustus", value:"08"},
    {name:"September", value:"09"},
    {name:"Oktober", value:"10"},
    {name:"November", value:"11"},
    {name:"Desember", value:"12"}
];

const tahunData = [];

for(let y = 2010; y >= 1960; y--){
    tahunData.push({name:String(y)});
}

/* LOADING BUTTON */
function setButtonLoading(button){
    button.disabled = true;

    button.innerHTML = `
        <div class="btn-loader">
            <img src="assets/home.png" class="btn-loader-icon" alt="">
            <span class="btn-loader-ring"></span>
        </div>
    `;
}

/* FOTO */
photoPreview.onclick = () => {
    photoInput.click();
};

photoInput.onchange = e => {
    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = () => {
        photoPreview.innerHTML = `<img src="${reader.result}">`;
        localStorage.setItem("foto", reader.result);
    };

    reader.readAsDataURL(file);
};

/* LOAD WILAYAH */
async function loadProvinsi(){
    try{
        const res = await fetch(`${API}/provinces.json`);
        provinsiData = await res.json();
    }catch(error){
        showGlassAlert("Gagal Memuat", "Provinsi gagal dimuat. Coba refresh halaman.");
    }
}

async function loadKabupaten(id){
    kabupatenData = [];
    kecamatanData = [];

    const res = await fetch(`${API}/regencies/${id}.json`);
    kabupatenData = await res.json();
}

async function loadKecamatan(id){
    kecamatanData = [];

    const res = await fetch(`${API}/districts/${id}.json`);
    kecamatanData = await res.json();
}

/* POPUP SELECT */
function openSelect(type, data){

    if(!data || data.length === 0){
        showGlassAlert("Data belum tersedia", "Pilihan belum berhasil dimuat.");
        return;
    }

    popup.classList.add("show");
    search.value = "";

    title.innerText =
    type === "provinsi" ? "Pilih Provinsi" :
    type === "kabupaten" ? "Pilih Kabupaten / Kota" :
    type === "kecamatan" ? "Pilih Kecamatan" :
    type === "jk" ? "Pilih Jenis Kelamin" :
    type === "hari" ? "Pilih Tanggal" :
    type === "bulan" ? "Pilih Bulan" :
    "Pilih Tahun";

    renderList(type, data);

    search.oninput = () => {
        const keyword = search.value.toLowerCase();

        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );

        renderList(type, filtered);
    };
}

function renderList(type, data){

    list.innerHTML = "";

    data.forEach(item => {

        const div = document.createElement("div");
        div.className = "select-item";
        div.innerText = item.name;

        div.onclick = async () => {

            if(type === "provinsi"){
                selectedProvinsi = item;
                selectedKabupaten = null;
                selectedKecamatan = null;

                provinsiText.innerText = item.name;
                kabupatenText.innerText = "Pilih Kabupaten / Kota";
                kecamatanText.innerText = "Pilih Kecamatan";

                popup.classList.remove("show");

                await loadKabupaten(item.id);
                return;
            }

            if(type === "kabupaten"){
                selectedKabupaten = item;
                selectedKecamatan = null;

                kabupatenText.innerText = item.name;
                kecamatanText.innerText = "Pilih Kecamatan";

                popup.classList.remove("show");

                await loadKecamatan(item.id);
                return;
            }

            if(type === "kecamatan"){
                selectedKecamatan = item;
                kecamatanText.innerText = item.name;
                popup.classList.remove("show");
                return;
            }

            if(type === "jk"){
                selectedJk = item.name;
                jkText.innerText = item.name;
                popup.classList.remove("show");
                return;
            }

            if(type === "hari"){
                selectedHari = item.name;
                hariText.innerText = item.name;
                popup.classList.remove("show");
                return;
            }

            if(type === "bulan"){
                selectedBulan = item;
                bulanText.innerText = item.name;
                popup.classList.remove("show");
                return;
            }

            if(type === "tahun"){
                selectedTahun = item.name;
                tahunText.innerText = item.name;
                popup.classList.remove("show");
                return;
            }

        };

        list.appendChild(div);
    });
}

/* KLIK PILIHAN */
document.querySelector('[data-type="provinsi"]').onclick = () => {
    openSelect("provinsi", provinsiData);
};

document.querySelector('[data-type="kabupaten"]').onclick = () => {
    if(!selectedProvinsi){
        showGlassAlert("Data belum lengkap", "Pilih provinsi terlebih dahulu.");
        return;
    }

    openSelect("kabupaten", kabupatenData);
};

document.querySelector('[data-type="kecamatan"]').onclick = () => {
    if(!selectedKabupaten){
        showGlassAlert("Data belum lengkap", "Pilih kabupaten / kota terlebih dahulu.");
        return;
    }

    openSelect("kecamatan", kecamatanData);
};

document.querySelector('[data-type="hari"]').onclick = () => {
    openSelect("hari", hariData);
};

document.querySelector('[data-type="bulan"]').onclick = () => {
    openSelect("bulan", bulanData);
};

document.querySelector('[data-type="tahun"]').onclick = () => {
    openSelect("tahun", tahunData);
};

document.querySelector('[data-type="jk"]').onclick = () => {
    openSelect("jk", genderData);
};

/* TUTUP POPUP */
popup.onclick = e => {
    if(e.target === popup){
        popup.classList.remove("show");
    }
};

/* ALERT GLASS */
function showGlassAlert(titleText, descText, callback){

    const alertPopup = document.getElementById("glassAlert");
    const alertTitle = document.getElementById("alertTitle");
    const alertDesc = document.getElementById("alertDesc");
    const alertBtn = document.getElementById("alertBtn");

    alertTitle.innerText = titleText;
    alertDesc.innerText = descText;

    alertBtn.disabled = false;
    alertBtn.innerText = callback ? "Lanjut" : "Mengerti";
    alertBtn.onclick = null;

    alertPopup.classList.add("show");

    alertBtn.onclick = () => {

        if(callback){
            setButtonLoading(alertBtn);

            setTimeout(() => {
                alertPopup.classList.remove("show");
                callback();
            },900);

        }else{
            alertPopup.classList.remove("show");
        }

    };
}

/* SUBMIT */
form.onsubmit = e => {

    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");

    if(!selectedProvinsi){
        showGlassAlert("Data belum lengkap", "Provinsi belum dipilih.");
        return;
    }

    if(!selectedKabupaten){
        showGlassAlert("Data belum lengkap", "Kabupaten / Kota belum dipilih.");
        return;
    }

    if(!selectedKecamatan){
        showGlassAlert("Data belum lengkap", "Kecamatan belum dipilih.");
        return;
    }

    if(!selectedHari || !selectedBulan || !selectedTahun){
        showGlassAlert("Data belum lengkap", "Tanggal lahir belum lengkap.");
        return;
    }

    if(!selectedJk){
        showGlassAlert("Data belum lengkap", "Jenis kelamin belum dipilih.");
        return;
    }

    if(submitBtn){
        setButtonLoading(submitBtn);
    }

    localStorage.setItem("provinsi", selectedProvinsi.name);
    localStorage.setItem("kabupaten", selectedKabupaten.name);
    localStorage.setItem("kecamatan", selectedKecamatan.name);

    localStorage.setItem(
        "tanggal",
        `${selectedHari}-${selectedBulan.value}-${selectedTahun}`
    );

    localStorage.setItem("jk", selectedJk);

    localStorage.setItem("nama", document.getElementById("nama").value);
    localStorage.setItem("tempat", document.getElementById("tempat").value);
    localStorage.setItem("alamat", document.getElementById("alamat").value);
    localStorage.setItem("rt", document.getElementById("rt").value);
    localStorage.setItem("rw", document.getElementById("rw").value);
    localStorage.setItem("desa", document.getElementById("desa").value);

    setTimeout(() => {
        showGlassAlert(
            "Berhasil",
            "Data diri berhasil disimpan.",
            () => {
                window.location.href = "status.html";
            }
        );
    },2500);

};

loadProvinsi();
