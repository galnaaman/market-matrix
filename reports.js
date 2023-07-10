"use strict";


(function () {

    const reports = document.getElementById("reports");


    function getFromSessionStorage(){
        const list = JSON.parse(sessionStorage.getItem("selectedCrypto"));
        if(list){
            return list;
        }
        else {
            return [];
        }
    }




    
}());