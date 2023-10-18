let button = document.querySelector("button");
let scoreText = document.getElementById("score-text");
let eps = document.getElementById("earn-per-second");
let score = 0;
let click = 0;
let passive = 0;
let multiplyer = 1;

button.addEventListener("click", earn);

function earn() {
  click = click + 1;
  score = score + 1 * multiplyer;
  console.log("earn money");
}

setInterval(function () {
  scoreText.textContent = score;
}, 10);

setInterval(function () {
  score = score + passive;
  eps.textContent = click * multiplyer + passive;
  click = 0;
}, 1000);
