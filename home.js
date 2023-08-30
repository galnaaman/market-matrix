"use strict";

const home = document.getElementById("home");
const container = document.getElementById("mainContent");
const header = document.getElementById("page-title");
const subHeader = document.getElementById("page-subtitle");
const btnHeader = document.getElementById("page-btn");

home.addEventListener("click", function () {
  document.title = "Market Matrix";
  header.innerHTML = "Welcome to Market Matrix";
  subHeader.innerHTML = "We Believe in Transparency";
  btnHeader.style.display = "none";
  homepage();
});


function homepage() {
  container.innerText = "HomePage";
}
homepage();
