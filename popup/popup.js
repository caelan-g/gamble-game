let clickButton = document.querySelector(".click-button");
let scoreText = document.getElementById("score-text");
let multiplyerText = document.getElementById("multiplyer-text");
let eps = document.getElementById("earn-per-second");
let buyButton = document.querySelector(".buy-button");
let buyButtonCost = document.getElementById("cost");
let resetButton = document.querySelector(".reset-button");
let score = 0;
let click = 0;
let passive = 1;
let multiplyer = 1;
let cost = 50;

getData();

clickButton.addEventListener("click", earn);
buyButton.addEventListener("click", buy);
resetButton.addEventListener("click", reset);

function earn() {
  click = click + 1;
  score = score + 1 * multiplyer;
  console.log("earn money");
}

function buy() {
  if (score >= cost) {
    score = score - cost;
    cost = cost * 2;
    buyButtonCost.textContent = cost;
    multiplyer = multiplyer * 1.5;
    storeData();
  }
}

function reset() {
  score = 0;
  multiplyer = 1;
  passive = 0;
  cost = 50;
}

setInterval(function () {
  scoreText.textContent = Math.round(score);
  multiplyerText.textContent = multiplyer;
}, 10);

setInterval(function () {
  score = score + passive;
  eps.textContent = click * multiplyer + passive;
  click = 0;
  storeData();
}, 1000);

function getData() {
  chrome.storage.local.get(["scoreStored"]).then((resultScore) => {
    console.log("score currently is " + resultScore.scoreStored);
    //score = score.scoreStored;
    score = resultScore.scoreStored;
    if (score === undefined) {
      score = 0;
    }
  });
  chrome.storage.local.get(["passiveStored"]).then((resultPassive) => {
    console.log("passive currently is " + resultPassive.passiveStored);
    //score = score.scoreStored;
    passive = resultPassive.passiveStored;
    if (passive === undefined) {
      passive = 0;
    }
  });
  chrome.storage.local.get(["multiplyerStored"]).then((resultMultiplyer) => {
    console.log("multiplyer currently is " + resultMultiplyer.multiplyerStored);
    //score = score.scoreStored;
    multiplyer = resultMultiplyer.multiplyerStored;
    console.log(multiplyer);
    if (multiplyer === undefined) {
      console.log("multiplyer udnefinded");
      multiplyer = 1;
    }
  });
  chrome.storage.local.get(["costStored"]).then((resultCost) => {
    console.log("cost currently is " + resultCost.costStored);
    //score = score.scoreStored;
    cost = resultCost.costStored;
    console.log(cost);
    if (cost === undefined) {
      console.log("cost udnefinded");
      cost = 50;
    }
    buyButtonCost.textContent = cost;
  });
}

function storeData() {
  chrome.storage.local.set({ scoreStored: score }).then(() => {
    console.log("Value of " + score + " is set");
  });
  chrome.storage.local.set({ passiveStored: passive }).then(() => {
    console.log("Value of " + passive + " is set");
  });
  chrome.storage.local.set({ multiplyerStored: multiplyer }).then(() => {
    console.log("Value of " + multiplyer + " is set");
  });
  chrome.storage.local.set({ costStored: cost }).then(() => {});
}
