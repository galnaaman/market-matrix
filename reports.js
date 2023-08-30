const reports = document.getElementById("reports");

reports.addEventListener("click", async function () {
  const container = document.getElementById("mainContent");
  container.innerHTML = "";
  showLoader();
  const coins = getFromSessionStorage();
  
  if (coins.length === 0) {
    hideLoader();
    alert("Please select at least one crypto to compare");
    const crypto = document.getElementById("crypto");
    crypto.click();
  }

  const initialPrices = await getCoinsReportData(coins);
  hideLoader();

  const chart = createReportTable(coins, initialPrices);
  
  setInterval(async () => {
    const newPrices = await getCoinsReportData(coins);
    updateReportTable(chart, newPrices);
  }, 1000000);
});


function createReportTable(coins, initialPrices) {
  const container = document.getElementById("mainContent");
  container.innerHTML = `<canvas id="cryptoChart" width="300" height="100"></canvas>`;
  const ctx = document.getElementById("cryptoChart").getContext("2d");
  
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [new Date().toLocaleTimeString()],  // initial time label
      datasets: coins.map((coin, index) => ({
        label: `${coin} in USD`,
        data: [initialPrices[index]],  // initial price
        borderColor: randomColor(),
        fill: false
      }))
    },
    options: {
      scales: {
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: false  // this will allow it to adjust dynamically
        },
        x: {
          position: 'bottom'
        }
      }
    }
  });

  return myChart;
}

function updateReportTable(chart, newPrices) {
  const newTime = new Date().toLocaleTimeString();
  chart.data.labels.push(newTime);
  
  for (let i = 0; i < newPrices.length; i++) {
    chart.data.datasets[i].data.push(newPrices[i]);
  }
  
  chart.update();
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
  return list ? list : [];
}

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
