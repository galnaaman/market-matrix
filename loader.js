function showLoader() {
    const loader = document.getElementById("loader");
    // const parent = loader.parentElement;
    // parent.style.display = "flex";
    console.log("global Loader");
    loader.style.display = "block";
}

function hideLoader() {
    const loader = document.getElementById("loader");
    // const parent = loader.parentElement;
    // parent.style.display = "none";
    loader.style.display = "none";
}