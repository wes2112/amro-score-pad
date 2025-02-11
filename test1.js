let score1 = 0;
let score2 = 0;

score1 = sessionStorage.getItem("score1")
  ? parseInt(sessionStorage.getItem("score1"))
  : 0;
score2 = sessionStorage.getItem("score2")
  ? parseInt(sessionStorage.getItem("score2"))
  : 0;
updateScoreDisplay();

let buttonOwners = {};
let buttonStates = {};
const frames = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

const modal = document.getElementById("pop");

function updateScoreDisplay() {
  //* store score in cookie
  sessionStorage.setItem("score1", score1);
  sessionStorage.setItem("score2", score2);

  document.getElementById("score_1").textContent = score1
    .toString()
    .padStart(1, "0");
  document.getElementById("score_2").textContent = score2
    .toString()
    .padStart(1, "0");
  //* to end the game and display modal
  if(score1 >= 120){
    console.log("player 1 wins");
    modal.style.display = "block";
    document.getElementById('winningPlayer').innerHTML = player1;
    document.getElementById('winningScore').innerHTML = score1;
    document.getElementById('loserName').innerHTML = player2;
    document.getElementById('loserScore').innerHTML = score2;
  }
  if(score2 >= 120) {
    modal.style.display = "block";
    document.getElementById("winningPlayer").innerHTML = player2;
    document.getElementById("winningScore").innerHTML = score2;
    document.getElementById("loserName").innerHTML = player1;
    document.getElementById("loserScore").innerHTML = score1;
  }
}

function handlePlayerButton(buttonId, points, player) {
  if (!buttonStates[buttonId]) {
    buttonStates[buttonId] = true;
    buttonOwners[buttonId] = player;
    if (player === 1) {
      score1 += points;
    } else {
      score2 += points;
    }
    document.getElementById(buttonId).style.backgroundColor =
      player === 1 ? "lime" : "lightcoral";
    hideOpponentButton(buttonId);
  } else {
    buttonStates[buttonId] = false;
    if (player === 1) {
      score1 -= points;
    } else {
      score2 -= points;
    }
    document.getElementById(buttonId).style.backgroundColor = "#ffffff";
    showOpponentButton(buttonId);
  }
  //* Save states to sessionStorage
  sessionStorage.setItem("buttonStates", JSON.stringify(buttonStates));
  sessionStorage.setItem("buttonOwners", JSON.stringify(buttonOwners));
  updateScoreDisplay();
}


function hideOpponentButton(buttonId) {
  let frame = buttonId.charAt(0);
  let num = buttonId.substring(2);
  let opponentButtonId = buttonId.includes("t")
    ? `${frame}r${num}`
    : `${frame}t${num}`;
  if (document.getElementById(opponentButtonId)) {
    document.getElementById(opponentButtonId).style.display = "none";
  }
}

function showOpponentButton(buttonId) {
  let frame = buttonId.charAt(0);
  let num = buttonId.substring(2);
  let opponentButtonId = buttonId.includes("t")
    ? `${frame}r${num}`
    : `${frame}t${num}`;
  if (document.getElementById(opponentButtonId)) {
    document.getElementById(opponentButtonId).style.display = "block";
  }
}

for (let frame of frames) {
  for (let i = 1; i <= 15; i++) {
    const button1 = document.getElementById(`${frame}t${i}`);
    const points1 = i >= 11 ? 2 : 1;
    if (button1) {
      button1.addEventListener("click", () =>
        handlePlayerButton(`${frame}t${i}`, points1, 1)
      );
    }

    const button2 = document.getElementById(`${frame}r${i}`);
    const points2 = i >= 11 ? 2 : 1;
    if (button2) {
      button2.addEventListener("click", () =>
        handlePlayerButton(`${frame}r${i}`, points2, 2)
      );
    }
  }
}
updateScoreDisplay();

function restoreButtonStates() {
  const storedStates = JSON.parse(sessionStorage.getItem("buttonStates")) || {};
  const storedOwners = JSON.parse(sessionStorage.getItem("buttonOwners")) || {};

  for (let buttonId in storedStates) {
    let button = document.getElementById(buttonId);
    if (button && storedStates[buttonId]) {
      // Ensure the button exists
      let player = storedOwners[buttonId];
      button.style.backgroundColor = player === 1 ? "lime" : "lightcoral";
      hideOpponentButton(buttonId);
    }
  }

  buttonStates = storedStates;
  buttonOwners = storedOwners;
}

//* Call restore function *after* the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(restoreButtonStates, 100);
});

//* modal handler

const trigger = openModal;

const closeModal = document.getElementById('closeButton');

document.getElementById("closeButton").addEventListener("click", () => {
  //* this closes modal
  const pop = document.getElementById('pop');
  if (pop.style.display === "block") {
  pop.style.display = "none";
  pop.classList.add("hide");
  } else {
    pop.classList.remove('hide');
  }
  //* this clears storage
  sessionStorage.clear();
  score1 = 0;
  score2 = 0;
  buttonStates = {};
  buttonOwners = {};
  updateScoreDisplay();
  location.reload();
});
function resetGame() {
  sessionStorage.clear();
  score1 = 0;
  score2 = 0;
  buttonStates = {};
  buttonOwners = {};
  updateScoreDisplay();
  location.reload();
}

