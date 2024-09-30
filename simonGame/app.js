let gameSeq = [];
let userSeq = [];

let colorsInx = ["yellow", "blue", "green", "red"];

let level = 0;
let started = false;
let highScore = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game Started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 300);
}

function levelUp() {
  // console.log("User Seq :- ", userSeq);
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // random button choose
  let randomNum = Math.floor(Math.random() * 4);
  let randomColor = colorsInx[randomNum];
  gameSeq.push(randomColor);
  // console.log("Game Seq :- ", gameSeq);
  // console.log("*-*-*-");
  let randomBtn = document.querySelector(`.${randomColor}`);
  gameFlash(randomBtn);
}

function checkAns(lastInx) {
  if (gameSeq[lastInx] === userSeq[lastInx]) {
    if (gameSeq.length === userSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    console.log("Game Over");
    h2.innerHTML = `Game Over! Your Score was <b><i>${level}</i></b> <br> Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    updateHighScore(level);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let btns = document.querySelectorAll(".box");

for (let btn of btns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function updateHighScore(score) {
  let h3 = document.querySelector("h3");

  if (score > highScore) {
    highScore = score;
    h3.innerHTML = `High Score: <b><i>${highScore}</i></b>`;
  }
}


// Display the Steps to play the game
let div = document.querySelector(".main");
let start = document.querySelector("#start");

window.onload = function () {
  console.log("Window Loaded");
  setTimeout(() => {
    div.style.display = "block";
  }, 1500);

  start.addEventListener("click", function () {
    setTimeout( () => {
      div.style.display = "none";
    }, 500);
  });
  
}
