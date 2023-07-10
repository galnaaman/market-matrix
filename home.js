"use strict";


const home = document.getElementById("home");
const container = document.getElementById("mainContent");

home.addEventListener("click",function(){
    homepage();
});


function showLoader() {
    const loader = document.getElementById("loader");
    // const parent = loader.parentElement;
    // parent.style.display = "flex";
    loader.style.display = "block";
}

function hideLoader() {
    const loader = document.getElementById("loader");
    // const parent = loader.parentElement;
    // parent.style.display = "none";
    loader.style.display = "none";
}



function homepage() {
    hideLoader();
    container.innerText = "HomePage";
}
homepage();



