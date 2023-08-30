"use strict";

const home = document.getElementById("home");

const header = document.getElementById("page-title");
const subHeader = document.getElementById("page-subtitle");
const btnHeader = document.getElementById("page-btn");

home.addEventListener("click", async function () {
  document.title = "Market Matrix";
  header.innerHTML = "Welcome to Market Matrix";
  subHeader.innerHTML = "We Believe in Transparency";
  btnHeader.style.display = "none";
  await homepage();
});

async function homepage() {
  const container = document.getElementById("mainContent");
  const response = await fetch("./news.json");
  const jsonData = await response.json();
  let html = "";
  for (let i = 0; i < jsonData.data.length; i++) {
    html += `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${jsonData.data[i].title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${jsonData.data[i].source_name}</h6>
        <img src="${jsonData.data[i].image_url}" class="card-img-top" alt="...">
        <p class="card-text">${jsonData.data[i].text}</p>
        <a target="_blank" href="${jsonData.data[i].news_url}" class="btn btn-primary">Read More</a>
      </div>
    </div>
    `;
  }
  container.innerHTML = html;
}

homepage();
