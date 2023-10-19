let button = document.querySelector("button");
let scoreText = document.getElementById("score-text");
let eps = document.getElementById("earn-per-second");
let score = 0;
let click = 0;
let passive = 1;
let multiplyer = 1;

getData();

button.addEventListener("click", earn);

function earn() {
  click = click + 1;
  score = score + 1 * multiplyer;
  console.log("earn money");
}

setInterval(function () {
  scoreText.textContent = score;
  console.log(score);
}, 10);

setInterval(function () {
  score = score + passive;
  eps.textContent = click * multiplyer + passive;
  click = 0;
  storeData();
}, 1000);

function getData() {
  chrome.storage.local.get(["scoreStored"]).then((resultScore) => {
    console.log("Value currently is " + resultScore.scoreStored);
    //score = score.scoreStored;
    score = resultScore.scoreStored;
  });
  chrome.storage.local.get(["passiveStored"]).then((resultPassive) => {
    console.log("Value currently is " + resultPassive.passiveStored);
    //score = score.scoreStored;
    passive = resultPassive.passiveStored;
  });
  chrome.storage.local.get(["multiplyerStored"]).then((resultMultiplyer) => {
    console.log("Value currently is " + resultMultiplyer.multiplyerStored);
    //score = score.scoreStored;
    multiplyer = resultMultiplyer.multiplyerStored;
    console.log(multiplyer);
  });
  if (multiplyer === undefined) {
    console.log("multiplyer udnefinded");
    multiplyer = 1;
  }
  if (passive === undefined) {
    passive = 0;
  }
  if (score === undefined) {
    score = 0;
  }
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
}
