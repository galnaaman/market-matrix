const API_KEY =
  "232a4516d08a2414e4299480c1165553f07f1cd1d228b3f6f48f4ddbb3b1f9c7";

const reports = document.getElementById("reports");
reports.addEventListener("click", async function () {
  const container = document.getElementById("mainContent");
  container.innerHTML = "";
  showLoader();
  const coins = getFromSessionStorage();
  console.log(coins);
  if (coins.length === 0) {
    hideLoader();
    alert("Please select at least one crypto to compare");
    const cryptoBtn = document.getElementById("crypto");
    cryptoBtn.click();
  }
  else{
  const coinPrices = await getCoinsReportData(coins);
  console.log(coinPrices)
  hideLoader();
  createReportTable(coins, coinPrices);
  }
});

function createReportTable(coins, prices) {
  const container = document.getElementById("mainContent");
  container.innerHTML = `<canvas id="cryptoChart" width="400" height="200"></canvas>`;
  const ctx = document.getElementById("cryptoChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: coins,
      datasets: [
        {
          label: "Price in USD",
          data: prices,
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
  });
}

async function getCoinsReportData(coins) {
  const coinPrices = [];
  for (const coin of coins) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=USD`
    );
    const data = await response.json();
    coinPrices.push(data[coin].usd);
    }
    
    return coinPrices;
  }
  


function getFromSessionStorage() {
  const list = JSON.parse(sessionStorage.getItem("selectedCrypto"));
  if (list) {
    return list;
  } else {
    return [];
  }
}
