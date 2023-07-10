"use strict";



(function () {
    // GLOBAL CONFIG - DO NOT CHANGE
    const GLOBAL_CONFIG = {
        stockAPI: 'https://api.example.com/stocks',
        cryptoAPI: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1',
        testingApi : "./data.json",
        searchCryptoApi : "https://api.coingecko.com/api/v3/search?query="
      };


    const selectedCrypto = [];



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


    const container = document.getElementById("mainContent");
    const crypto = document.getElementById("crypto");
    const stocks = document.getElementById("stocks");
    const searchInput = document.getElementById("searchInput");
    const addBtn = document.getElementById("addBtn");

   

    // crypto currency event listener for click 
    crypto.addEventListener("click", async function(){
        showLoader();
        const data = await getData();
        displayData(data,false);
        cryptoViewMore();
        addCryptoToReport();
    });
    
    searchInput.addEventListener("keyup", async function(){
        if(searchInput.value == ""){
            const data = await getData();
            displayData(data,false);
            cryptoViewMore();
            addCryptoToReport();
        }else {
            const results = await searchCrypto(searchInput.value);
            displayData(results,true);
            cryptoViewMore();
            addCryptoToReport();
            
        }
       

    })
    

    function savetoLocalStorage(data,id){
        const newData = {};
        newData.dollars = data.market_data.current_price.usd;
        newData.shekels = data.market_data.current_price.ils;
        newData.pounds = data.market_data.current_price.gbp;
        newData.time = new Date().getTime();
        localStorage.setItem(id,JSON.stringify(newData));
    }

    function getFromLocalStorage(id){
        const data = JSON.parse(localStorage.getItem(id));
        if (data) { 
            const time = new Date();
            const diff = time.getTime() - data.time;
            const minutes = Math.floor(diff / 1000 / 60);
            if(minutes > 2){
                console.log("expired");
                return {"data":data,"isExpired":true};          
            }else{
                console.log("not expired");
                return {"data":data,"isExpired":false};          
            }
        }else {
            console.log("no data");
            return {"isExpired":"None"};
        }
    }


    function saveToSessionStorage(list){
        sessionStorage.setItem("selectedCrypto",JSON.stringify(list));
    }

    function getFromSessionStorage(){
        const list = JSON.parse(sessionStorage.getItem("selectedCrypto"));
        if(list){
            return list;
        }
        else {
            return [];
        }
    }
    

    function maxCryptoToReport(){
        
        const popup = document.getElementById("popup");
        const modal = document.getElementById("test1");
        const modelBody = document.getElementById("modelBody");
        const data = getFromSessionStorage();
        let html = "";
        for(const crypto of data){
            html += `
            <div class="col-md col-sm col-lg">
            <div class="card-shadow shadow  rounded me-0">
                <div class="card text-center">
                    <div class="card-body">
                        <button id="delete-${crypto}" class="btn btn-danger delete-btn">X</button>
                        <p class="card-text">${crypto}</p>
                        <input class="form-check-input add-report" type="checkbox" role="switch">
                    </div>
                </div>
            </div>
            `;
        };
        modelBody.innerHTML = html;
        console.log(data);
        console.log(popup);
        modal.click();
        popup.className = "";
        const saveBtn = document.getElementById("saveBtn");
        const closeBtn = document.getElementById("closeBtn");
        saveBtn.addEventListener("click",function(){
            closeBtn.click();
            console.log("save");
            console.log(selectedCrypto);
        });


    }


    function addCryptoToReport(){
        const addReportBtns = document.getElementsByClassName("add-report");
        for(const btn of addReportBtns){
            btn.addEventListener("click",function(){
                btn.id = btn.id.replace("check-","");
                if(btn.checked){
                    if (selectedCrypto.length >= 5) {
                        btn.checked = false;
                        maxCryptoToReport();
                    }
                    else {
                        selectedCrypto.push(btn.id);
                        saveToSessionStorage(selectedCrypto);
                        console.log(selectedCrypto);
                    }
                }
                else {
                    const index = selectedCrypto.indexOf(btn.id);
                    selectedCrypto.splice(index,1);
                    saveToSessionStorage(selectedCrypto);
                    console.log(selectedCrypto);
                }
                    
             });
        }
        const list = getFromSessionStorage();
        if (list.length == 0){
            console.log("empty");
        }
        else{
            const btns = document.getElementsByClassName("add-report");
        for(const btn of btns){
            let id = btn.id.replace("check-","");
            if(list.includes(id)){
                btn.checked = true;
            }
            else {
                btn.checked = false;
            }
        }

        }

    }


    async function cryptoViewMore(){
        const viewMoreButtons = document.getElementsByClassName("view-more");
        for(const btn of viewMoreButtons){
           btn.addEventListener("click", async function(){
            const priceContainer = document.getElementById("price-"+btn.id);
            console.log(priceContainer.style.display);
            if (priceContainer.className == "mt-1 d-none") {
                const check = getFromLocalStorage(btn.id);
                if(check.isExpired == true || check.isExpired == "None"){
                    const response = await fetch("https://api.coingecko.com/api/v3/coins/" + btn.id);
                    const extraData = await response.json();
                    savetoLocalStorage(extraData,btn.id);
                    priceContainer.className = "d-block mt-1 ";
                    const dollars = "<p>"+extraData.market_data.current_price.usd + "$"+"</p>";
                    const shekels = "<p>"+extraData.market_data.current_price.ils + "₪"+"</p>";
                    const pounds = "<p>"+extraData.market_data.current_price.gbp + "£"+"</p>";
                    priceContainer.innerHTML = dollars + shekels + pounds;
                }
                else if(check.isExpired == false){
                    priceContainer.className = "d-block mt-1 ";
                    const dollars = "<p>"+check.data.dollars + "$"+"</p>";
                    const shekels = "<p>"+check.data.shekels + "₪"+"</p>";
                    const pounds = "<p>"+check.data.pounds + "£"+"</p>";
                    priceContainer.innerHTML = dollars + shekels + pounds;
                }
            } else {
                priceContainer.className = "mt-1 d-none";
            }
           }); 
        }
    }

  
    async function searchCrypto(value) {
        try {
            const response = await fetch(GLOBAL_CONFIG.searchCryptoApi + value)
            const data = await response.json();
            console.log(data.coins) ;
            return data.coins ;
        } catch(error){
            console.error('Error:', error);
        }

    }

    // get crypto currency data from api
    async function getData() {
        // console.log(GLOBAL_CONFIG.cryptoAPI)
        try {
            const response = await fetch(GLOBAL_CONFIG.cryptoAPI);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
   
    }


    


    // display crypto currency data 
    async function displayData(data,isSearch) {
    
        let html = '';
        if(!isSearch){
            for (let i = 0 ; i <data.length; i++){
                html += `
                <div class="col-md-4 me-0 col-sm-6 col-lg-3">
                <div class="card-big-shadow shadow  rounded me-0">
                    <div class="card text-center " data-background="color" data-color="yellow" data-radius="none">
                        <div class="card-header">
                            <div class="form-check form-switch">
                            <input class="form-check-input add-report" type="checkbox" role="switch" id="check-${data[i].id}">
                            <i class = "badge text-bg-success">${data[i].symbol}</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-3">
                                    <img src="${data[i].image}" width="60" alt="" class="img-fluid">
                                </div>
                                <div class="col-9">
                                    <h4 class="title">${data[i].name}  </h4>
                                    <button id="${data[i].id}" class="btn btn-primary view-more">View More</button>
                                    <div id="price-${data[i].id}" class="mt-1 d-none"></div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
                `;
            };
        }
        else {
            for (let i = 0 ; i <data.length; i++){
                html += `
                <div class="col-md-4 me-0 col-sm-6 col-lg-3">
                <div class="card-big-shadow shadow  rounded me-0">
                    <div class="card text-center " data-background="color" data-color="yellow" data-radius="none">
                        <div class="card-header">
                            <div class="form-check form-switch">
                            <input class="form-check-input add-report" type="checkbox" role="switch" id="check-${data[i].id}">
                            <i class = "badge text-bg-success">${data[i].symbol}</i>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-3">
                                    <img src="${data[i].large}" width="60" alt="" class="img-fluid">
                                </div>
                                <div class="col-9">
                                    <h4 class="title">${data[i].name}  </h4>
                                    <button id="${data[i].id}" class="btn btn-primary view-more">View More</button>
                                    <div id="price-${data[i].id}" class="mt-1 d-none"></div>
                                </div>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
                `;
            };
        }
       
        hideLoader();
        container.innerHTML = html;

    }





    





}()); // end 'use strict'

