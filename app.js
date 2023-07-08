"use strict";



(function () {

    const GLOBAL_CONFIG = {
        stockAPI: 'https://api.example.com/stocks',
        cryptoAPI: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
      };


    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.display = "none";
    }

    async function getData() {
        // console.log(GLOBAL_CONFIG.cryptoAPI)
        const response = await fetch(GLOBAL_CONFIG.cryptoAPI);
        const data = await response.json();
        // console.log(data);

        return data;
    // container.innerText = data[0]["name"] ;
    }

    async function displayData() {
        const container = document.getElementById("mainContent");
        const data = await getData();
        console.log(data);
        let html = '';
        for (let i = 0 ; i <data.length; i++){
            html += `
            <div class="col-md-4 col-sm-6 content-card">
            <div class="card-big-shadow shadow rounded">
                <div class=" card card-just-text" data-background="color" data-color="yellow" data-radius="none">
                    <div class="card-header p-3">
                        <button type="button" class="btn-close float-end invisible "onclick=""></button>
                    </div>
                    <div class="card-body">
                        <h4 class="title">${data[i].name}</h4>
                        <h6 class="category">${data[i].current_price}</h6>
                        <p class="description">${data[i].symbol} </p>
                    </div>
                </div>
            </div>
        </div>
            `;
        };
        console.log(html);
        hideLoader();
        container.innerHTML = html;

    }
    displayData();


    






}()); // end 'use strict'

