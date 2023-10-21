let clickButton = document.querySelector(".click-button");
let scoreText = document.getElementById("score-text");
let multiplierText = document.getElementById("multiplier-text");
let eps = document.getElementById("earn-per-second");
let buyButton = document.querySelector(".buy-button");
let buyButtonCost = document.getElementById("cost");
let passiveButton = document.querySelector(".passive-button");
let passiveButtonCost = document.getElementById("passive-cost");
let resetButton = document.querySelector(".reset-button");
let spinButton = document.querySelector(".spin-button");
let work = document.querySelector(".work");
let casino = document.querySelector(".casino");
let workPage = document.getElementById("work-page");
let casinoPage = document.getElementById("casino-page");
let idle = document.getElementById("idle");
let result = document.querySelector(".result");
let num1 = document.querySelector(".spin-1");
let num2 = document.querySelector(".spin-2");
let num3 = document.querySelector(".spin-3");
let score = 0;
let click = 0;
let passive = 1;
let multiplier = 1;
let cost = 50;
let passiveCost = 50;
let chance;
let modeType = 1;
let spinning = false;

workMode();
getData();

clickButton.addEventListener("click", earn);
buyButton.addEventListener("click", buy);
passiveButton.addEventListener("click", passiveBuy);
resetButton.addEventListener("click", reset);
spinButton.addEventListener("click", spin);
work.addEventListener("click", workMode);
casino.addEventListener("click", casinoMode);

function earn() {
  click = click + 1;
  score = score + 1 * multiplier;
  console.log("earn money");
}

function buy() {
  if (score >= cost) {
    score = score - cost;
    cost = cost * 1.75;
    buyButtonCost.textContent =
      "$" + convertToMillion(Math.round(cost * 10) / 10);
    multiplier = multiplier * 1.5;
    storeData();
  }
}

function passiveBuy() {
  if (score >= passiveCost) {
    score = score - passiveCost;
    passiveCost = passiveCost * 2;
    passiveButtonCost.textContent =
      "$" + convertToMillion(Math.round(passiveCost * 10) / 10);
    passive++;
    idle.textContent = passive;
    storeData();
  }
}

function reset() {
  score = 0;
  multiplier = 1;
  passive = 0;
  cost = 50;
  passiveCost = 50;
  buyButtonCost.textContent = "$" + cost;
  passiveButtonCost.textContent = "$" + passiveCost;
  idle.textContent = passive;
}

function spin() {
  let spinAmount = document.getElementById("spin-amount").value;
  console.log(spinAmount);
  if ((score > spinAmount || score == spinAmount) && spinning == false) {
    spinning = true;
    score = score - spinAmount;
    result.textContent = "Spinning...";
    numberSpin();
    setTimeout(function () {
      if (spinAmount / score > 0.8 || spinAmount / score < 0.1) {
        chance = getRandomInt(70);
      } else {
        chance = getRandomInt(100);
      }
      console.log(chance);
      if (chance <= 30) {
        score = score + spinAmount * 3;
        result.textContent = "3x Your Spin!";
        //console.log("win small");
      } else if (chance == 10) {
        score = score + spinAmount * 8;
        result.textContent = "8x Your Spin!";
        //console.log("win big");
      } else if (chance == 1) {
        score = score + spinAmount * 25;
        result.textContent = "25x Your Spin!";
        //console.log("massive win");
      } else {
        result.textContent = "Loss!";
        //console.log("ya lost");
      }
      spinning = false;
    }, 1000);
  } else {
    console.log("poor");
  }
}

function numberSpin() {
  let spinTrue = 0;
  setTimeout(function () {
    spinTrue = 1;
    setTimeout(function () {
      spinTrue = 2;
      setTimeout(function () {
        spinTrue = 3;
        clearInterval(spinFunction);
      }, 1000);
    }, 1000);
  }, 1000);
  const spinFunction = setInterval(function () {
    if (spinTrue == 1) {
      num1.textContent = 0;
    } else if (spinTrue == 2) {
      num2.textContent = 0;
    } else if (spinTrue == 3) {
      num3.textContent = 0;
    } else {
      num1.textContent = getRandomInt(9);
      num2.textContent = getRandomInt(9);
      num3.textContent = getRandomInt(9);
    }
  }, 10);
}

function casinoMode() {
  modeType = 2;
  work.style.scale = 1;
  casino.style.scale = 1.1;
  // work.style.left = -100 + "px";
  // casino.style.left = 0 + "px";
  workPage.style.left = -500 + "px";
  casinoPage.style.left = 0 + "px";
}

function workMode() {
  modeType = 1;
  work.style.scale = 1.1;
  casino.style.scale = 1;
  // casino.style.left = -100 + "px";
  // work.style.left = 0 + "px";
  workPage.style.left = 0 + "px";
  casinoPage.style.left = 500 + "px";
}

setInterval(function () {
  scoreText.textContent = convertToMillion(Math.round(score));
  multiplierText.textContent = Math.round(multiplier * 10) / 10;
}, 10);

setInterval(function () {
  if (modeType == 1) {
    score = score + passive * multiplier;
    eps.textContent = convertToMillion(
      Math.round((click * multiplier + passive * multiplier) * 10) / 10
    );
    click = 0;
  }
  storeData();
}, 1000);

function getData() {
  chrome.storage.local.get(["scoreStored"]).then((resultScore) => {
    //console.log("score currently is " + resultScore.scoreStored);
    //score = score.scoreStored;
    score = resultScore.scoreStored;
    if (score === undefined) {
      score = 0;
    }
  });
  chrome.storage.local.get(["passiveStored"]).then((resultPassive) => {
    //console.log("passive currently is " + resultPassive.passiveStored);
    //score = score.scoreStored;
    passive = resultPassive.passiveStored;
    idle.textContent = Math.round(passive * 10) / 10;
    if (passive === undefined) {
      passive = 0;
    }
  });
  chrome.storage.local.get(["multiplierStored"]).then((resultMultiplier) => {
    //console.log("multiplier currently is " + resultMultiplier.multiplierStored);
    //score = score.scoreStored;
    multiplier = resultMultiplier.multiplierStored;
    console.log(multiplier);
    if (multiplier === undefined) {
      multiplier = 1;
    }
  });
  chrome.storage.local.get(["costStored"]).then((resultCost) => {
    //console.log("cost currently is " + resultCost.costStored);
    //score = score.scoreStored;
    cost = resultCost.costStored;
    console.log(cost);
    if (cost === undefined) {
      cost = 50;
    }
    buyButtonCost.textContent = convertToMillion(Math.round(cost * 10) / 10);
  });
  chrome.storage.local.get(["passiveCostStored"]).then((resultPassiveCost) => {
    //console.log("cost currently is " + resultCost.costStored);
    //score = score.scoreStored;
    passiveCost = resultPassiveCost.passiveCostStored;
    console.log(passiveCost);
    if (passiveCost === undefined) {
      passiveCost = 50;
    }
    passiveButtonCost.textContent = convertToMillion(
      Math.round(passiveCost * 10) / 10
    );
  });
}

function storeData() {
  chrome.storage.local.set({ scoreStored: score }).then(() => {
    //console.log("Value of " + score + " is set");
  });
  chrome.storage.local.set({ passiveStored: passive }).then(() => {
    //console.log("Value of " + passive + " is set");
  });
  chrome.storage.local.set({ multiplierStored: multiplier }).then(() => {
    //console.log("Value of " + multiplier + " is set");
  });
  chrome.storage.local.set({ costStored: cost }).then(() => {});
  chrome.storage.local.set({ passiveCostStored: passiveCost }).then(() => {});
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function convertToMillion(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}
