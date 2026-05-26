document.addEventListener('gesturestart', function(e){
    e.preventDefault();
});

document.addEventListener('touchmove', function(e){
    e.preventDefault();
}, { passive:false });

/* FORCE PLAY VIDEO */
const bannerVideo =
document.querySelector(".banner-video");

if(bannerVideo){

    bannerVideo.play();

    bannerVideo.addEventListener(
    "pause",
    ()=>{

        bannerVideo.play();

    });

}

/* ========================= */
/* RESET LOADING SAAT BACK */
/* ========================= */

window.addEventListener("pageshow", () => {

    loadingBox.style.display = "none";

});

const menuBox = document.querySelectorAll(".menu-box");

menuBox.forEach((box)=>{

    box.addEventListener("click", ()=>{

        /* efek sentuh */
        box.style.transform = "scale(0.96)";
        box.style.filter = "brightness(0.9)";

        setTimeout(()=>{

            box.style.transform = "scale(1)";
            box.style.filter = "brightness(1)";

        },150);

        /* tampil loading */
        document.getElementById("loadingBox")
        .style.display = "flex";

        /* pindah halaman */
        setTimeout(()=>{

            window.location.href = "loading.html";

        },2000);

    });

});
