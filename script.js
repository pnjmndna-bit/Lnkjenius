document.addEventListener("DOMContentLoaded", () => {

    const chatbot = document.getElementById("chatbot");
    const openChat = document.getElementById("openChat");
    const closeChat = document.getElementById("closeChat");

    if(closeChat && chatbot){
        closeChat.addEventListener("click", () => {
            chatbot.classList.add("hide");
        });
    }

    if(openChat){
        openChat.addEventListener("click", () => {
            window.location.href = "chat.html";
        });
    }

    const navItems = document.querySelectorAll(".nav-item");
    const loginPopup = document.getElementById("loginPopup");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            const text = item.innerText.trim().toLowerCase();

            if(
                text.includes("aktivitas") ||
                text.includes("dompet") ||
                text.includes("saya")
            ){
                if(loginPopup){
                    loginPopup.classList.add("show");
                }
            }
        });
    });

    const closePopup = document.getElementById("closePopup");
    const popupLanjut = document.getElementById("popupLanjut");

    if(closePopup && loginPopup){
        closePopup.addEventListener("click", () => {
            loginPopup.classList.remove("show");
        });
    }

    if(popupLanjut){
        popupLanjut.addEventListener("click", () => {
            popupLanjut.disabled = true;
            popupLanjut.classList.add("loading");

            popupLanjut.innerHTML = `
                <span class="btn-spinner"></span>
            `;

            setTimeout(() => {
                window.location.href = "loading.html";
            }, 2500);
        });
    }

    document.querySelectorAll(".service-item[data-service]").forEach(item => {
        item.addEventListener("click", () => {

            const selectedService = item.dataset.service;

            localStorage.setItem("produkDipilih", selectedService);

            item.classList.add("loading");

            const img = item.querySelector("img");

            if(img){
    img.style.opacity = "0";

    img.insertAdjacentHTML("afterend", `
        <div class="service-spinner">
    <img src="assets/home.png" class="service-loader-icon">
    <span class="service-loader-dot"></span>
</div>
    `);
}

            setTimeout(() => {
                window.location.href = "loading.html";
            }, 2500);

        });
    });

    const track = document.getElementById("posterTrack");
    const dots = document.querySelectorAll(".poster-dot");

    if(track){
        function updateDot(){
            const cards = document.querySelectorAll(".poster-card");
            let active = 0;
            let min = Infinity;

            cards.forEach((card,index) => {
                const distance = Math.abs(
                    card.getBoundingClientRect().left -
                    window.innerWidth / 2 +
                    card.offsetWidth / 2
                );

                if(distance < min){
                    min = distance;
                    active = index;
                }
            });

            dots.forEach(dot => dot.classList.remove("active"));

            if(dots.length){
                dots[active % dots.length].classList.add("active");
            }
        }

        track.addEventListener("scroll", updateDot);
        updateDot();

        setInterval(() => {
            const card = document.querySelector(".poster-card");
            if(!card) return;

            const cardWidth = card.offsetWidth + 12;

            track.scrollBy({
                left:cardWidth,
                behavior:"smooth"
            });

            if(track.scrollLeft >= track.scrollWidth - track.clientWidth - 10){
                setTimeout(() => {
                    track.scrollTo({
                        left:0,
                        behavior:"auto"
                    });
                },450);
            }
        },3500);
    }

    const typingText = document.getElementById("typingText");

    if(typingText){
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
    }

    const welcomePopup = document.getElementById("welcomePopup");
    const welcomeBtn = document.getElementById("welcomeBtn");
    const notifTop = document.getElementById("notifTop");

    if(welcomePopup){

        function playNotifTop(){
            if(!notifTop) return;

            notifTop.currentTime = 0;

            notifTop.play().catch(() => {
                console.log("Audio diblokir browser sampai user tap layar");
            });
        }

        function showWelcomePopup(){
            welcomePopup.classList.remove("hide");
            welcomePopup.classList.add("show");

            playNotifTop();
        }

        function hideWelcomePopup(){
            welcomePopup.classList.remove("show");
            welcomePopup.classList.add("hide");

            setTimeout(() => {
                welcomePopup.classList.remove("hide");
            }, 420);
        }

        showWelcomePopup();

        if(welcomeBtn){
            welcomeBtn.addEventListener("click", hideWelcomePopup);
        }
    }

    const notifList = document.getElementById("notifList");

    const prefixes = [
        "811","812","813","821","822","823",
        "831","832","851","852","853","855",
        "856","857","858","859","877","878",
        "881","882","895","896","897","898","899"
    ];

    const notifTexts = [
        "Mengaktifkan DANA Cicil",
        "Mengaktifkan DANA Instan",
        "Mencairkan Pinjaman",
        "Telah Investasi Emas",
        "Telah Investasi Crypto",
        "Mendapatkan Hadiah",
        "Membuat DANA Bisnis"
    ];

    function randomPhone(){
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const last = Math.floor(1000 + Math.random() * 9000);

        return `0${prefix}****${last}`;
    }

    function randomText(){
        return notifTexts[Math.floor(Math.random() * notifTexts.length)];
    }

    function createNotif(){
        return `
            <div class="notif-item">
                <img src="assets/home.png" class="notif-logo" alt="">

                <div class="notif-text">
                    <b>DANA</b>
                    <span class="notif-phone">${randomPhone()}</span>
                    <span class="notif-action">${randomText()}</span>
                </div>

                <div class="notif-mega">📣</div>
            </div>
        `;
    }

    function renderNotif(){
        if(!notifList) return;

        notifList.innerHTML = "";

        for(let i = 0; i < 4; i++){
            notifList.innerHTML += createNotif();
        }
    }

    renderNotif();

    if(notifList){
        setInterval(renderNotif, 3500);
    }

});

function setClock(id, timezone, label){
    const el = document.getElementById(id);
    if(!el) return;

    const now = new Date();

    const time = new Intl.DateTimeFormat("id-ID", {
        timeZone:timezone,
        hour:"2-digit",
        minute:"2-digit",
        hour12:false
    }).format(now);

    el.textContent = `${time} ${label}`;
}

function updateClocks(){
    setClock("clockWIB", "Asia/Jakarta", "WIB");
    setClock("clockWITA", "Asia/Makassar", "WITA");
    setClock("clockWIT", "Asia/Jayapura", "WIT");
}

updateClocks();
setInterval(updateClocks, 1000);
