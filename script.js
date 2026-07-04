document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CHATBOT
    ========================= */

  const chatbot = document.getElementById("chatbot");
const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");

if(closeChat){
    closeChat.addEventListener("click", () => {
        chatbot.classList.add("hide");
    });
}

if(openChat){
    openChat.addEventListener("click", () => {
        window.location.href = "chat.html";
    });
}

    /* =========================
       NAVBAR ACTIVE
    ========================= */

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navItems.forEach(nav => {
                nav.classList.remove("active");
            });

            item.classList.add("active");

        });

    });

    /* =========================
       POSTER CAROUSEL
    ========================= */

    const track = document.getElementById("posterTrack");
    const dots = document.querySelectorAll(".poster-dot");

    if(track){

        let isDown = false;
        let startX;
        let scrollLeft;

        // drag manual
        track.addEventListener("mousedown", e=>{
            isDown = true;
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
        });

        track.addEventListener("mouseleave", ()=>{
            isDown = false;
        });

        track.addEventListener("mouseup", ()=>{
            isDown = false;
        });

        track.addEventListener("mousemove", e=>{

            if(!isDown) return;

            e.preventDefault();

            const walk = (e.pageX - startX) * 1.4;

            track.scrollLeft = scrollLeft - walk;

        });

        // touch hp
        let startTouch = 0;

        track.addEventListener("touchstart", e=>{
            startTouch = e.touches[0].clientX;
        });

        track.addEventListener("touchmove", e=>{

            const move = startTouch - e.touches[0].clientX;

            track.scrollLeft += move;

            startTouch = e.touches[0].clientX;

        });

        // update dot
        function updateDot(){

            const cards = document.querySelectorAll(".poster-card");

            let active = 0;
            let min = Infinity;

            cards.forEach((card,index)=>{

                const distance = Math.abs(
                    card.getBoundingClientRect().left -
                    window.innerWidth/2 +
                    card.offsetWidth/2
                );

                if(distance < min){

                    min = distance;
                    active = index;

                }

            });

            dots.forEach(dot=>dot.classList.remove("active"));

            dots[active % dots.length].classList.add("active");

        }

        track.addEventListener("scroll", updateDot);

        updateDot();

        // auto slide
        setInterval(()=>{

            const cardWidth =
                document.querySelector(".poster-card").offsetWidth + 12;

            track.scrollBy({

                left:cardWidth,
                behavior:"smooth"

            });

            // loop
            if(track.scrollLeft >= track.scrollWidth - track.clientWidth - 10){

                setTimeout(()=>{

                    track.scrollTo({

                        left:0,
                        behavior:"auto"

                    });

                },450);

            }

        },3500);

    }
 
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("loginPopup");
    const closePopup = document.getElementById("closePopup");
    const popupLanjut = document.getElementById("popupLanjut");

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const text = item.innerText.trim().toLowerCase();

            if(
                text.includes("aktivitas") ||
                text.includes("dompet") ||
                text.includes("saya")
            ){
                popup.classList.add("show");
            }
        });
    });

    closePopup.addEventListener("click", () => {
        popup.classList.remove("show");
    });

    popupLanjut.addEventListener("click", () => {
        window.location.href = "loading.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const serviceData = {
        pinjaman:{
            title:"PINJAMAN DANA",
            banner:"assets/banner-pinjaman.png",
            button:"Ajukan Pinjaman",
            note:"Dengan melanjutkan, Anda menyetujui proses pengajuan sesuai ketentuan yang berlaku.",
            items:[
                "Pengajuan cepat dan praktis langsung dari aplikasi.",
                "Limit pinjaman sampai Rp50.000.000.",
                "Proses pencairan lebih cepat setelah verifikasi berhasil."
            ]
        },
        instan:{
            title:"AKTIFKAN DANA INSTAN",
            banner:"assets/banner-instan.png",
            button:"Aktifkan Sekarang",
            note:"Aktifkan fitur DANA Instan untuk kemudahan akses dana saat dibutuhkan.",
            items:[
                "Akses dana lebih cepat saat kebutuhan mendesak.",
                "Proses aman dengan verifikasi akun.",
                "Cairkan kapan saja setelah fitur aktif."
            ]
        },
        cicil:{
            title:"AKTIFKAN DANA CICIL",
            banner:"assets/banner-cicil.png",
            button:"Lanjutkan Pengajuan",
            note:"Dengan mengaktifkan fitur ini, Anda menyetujui Syarat & Ketentuan DANA Cicil yang berlaku.",
            items:[
                "Proses persetujuan cepat hanya dalam hitungan detik.",
                "Bebas pilih tenor 2, 6, atau 12 Minggu.",
                "Cicil otomatis dari saldo DANA setiap masa tenggang."
            ]
        },
        emas:{
            title:"INVESTASI EMAS",
            banner:"assets/banner-emas.png",
            button:"Mulai Investasi",
            note:"Investasi memiliki risiko. Pastikan Anda memahami ketentuan sebelum melanjutkan.",
            items:[
                "Mulai investasi emas dengan mudah.",
                "Pantau perkembangan nilai emas secara praktis.",
                "Transaksi dilakukan dengan sistem keamanan berlapis."
            ]
        },
        logout:{
            title:"Log Out Perangkat",
            banner:"assets/banner-logout.png",
            button:"Keluar dari Perangkat",
            note:"Gunakan fitur ini jika Anda merasa akun digunakan di perangkat lain.",
            items:[
                "Amankan akun dari perangkat yang tidak dikenal.",
                "Keluar dari semua sesi perangkat secara otomatis.",
                "Proses dilakukan cepat setelah verifikasi berhasil."
            ]
        }
    };

    const servicePopup = document.getElementById("servicePopup");
    const closeServicePopup = document.getElementById("closeServicePopup");
    const popupTitle = document.getElementById("popupTitle");
    const popupBanner = document.getElementById("popupBanner");
    const popupList = document.getElementById("popupList");
    const popupNote = document.getElementById("popupNote");
    const popupButton = document.getElementById("popupButton");

    document.querySelectorAll(".service-card[data-service]").forEach(card => {
        card.addEventListener("click", () => {
            const key = card.dataset.service;
            const data = serviceData[key];

            popupTitle.textContent = data.title;
            popupBanner.src = data.banner;
            popupButton.textContent = data.button;
            popupNote.textContent = data.note;

            popupList.innerHTML = data.items.map(text => `
                <div class="service-popup-item">
                    <p>${text}</p>
                </div>
            `).join("");

            servicePopup.classList.add("show");
        });
    });

    closeServicePopup.addEventListener("click", () => {
        servicePopup.classList.remove("show");
    });

    popupButton.addEventListener("click", () => {
        window.location.href = "loading.html";
    });
});

/* =========================
       TYPING INFO TERKINI
    ========================= */

const typingText = document.getElementById("typingText");

const messages = [
    "Tips keamanan: aktifkan autentikasi PIN dan jangan berikan kode rahasia kepada siapa pun.",
    "Jaga data pribadi Anda agar transaksi tetap aman dan nyaman.",
    "Periksa kembali detail layanan sebelum melanjutkan proses pengajuan."
];

let msgIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){
    const current = messages[msgIndex];

    if(!deleting){
        typingText.textContent = current.substring(0, charIndex++);
        if(charIndex > current.length){
            deleting = true;
            setTimeout(typeEffect, 1600);
            return;
        }
    }else{
        typingText.textContent = current.substring(0, charIndex--);
        if(charIndex < 0){
            deleting = false;
            msgIndex = (msgIndex + 1) % messages.length;
        }
    }

    setTimeout(typeEffect, deleting ? 35 : 45);
}

typeEffect();
