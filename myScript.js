// Include jQuery library
$(document).ready(function () {
  $("#bt_1").click(function () {
    $("#header_h").slideToggle(2000);
  });
});

// Select elements
const coin = document.querySelector("#coin");
const button = document.querySelector("#flip");
const status = document.querySelector("#status");
const headsCounter = document.querySelector("#headsCount");
const tailsCounter = document.querySelector("#tailsCount");

// Initialize counters
let headsCount = 0;
let tailsCount = 0;

// Animation CSS classes
const ANIMATE_CLASSES = {
  heads: "animate-heads",
  tails: "animate-tails"
};

// Function to process result
function processResult(result) {
  if (result === "heads") {
    headsCount++;
    headsCounter.innerText = headsCount;
  } else {
    tailsCount++;
    tailsCounter.innerText = tailsCount;
  }
  status.innerText = result.toUpperCase();
}

// Function to flip coin
function flipCoin() {
  // Remove existing class
  coin.classList.remove(...Object.values(ANIMATE_CLASSES));

  // Generate random result
  const random = crypto.getRandomValues(new Uint32Array(1))[0] % 2;
  const result = random === 0 ? "heads" : "tails";

  // Animate coin flip
  coin.classList.add(ANIMATE_CLASSES[result]);

  // Process result after animation
  setTimeout(processResult.bind(null, result), 2900);
}

// Event listeners
button.addEventListener("click", flipCoin);
button.addEventListener("touchstart", flipCoin);

// Define animation CSS classes
const animateHead = document.createElement("div");
animateHead.classList.add("animate-heads");
animateHead.style.backgroundImage = "linear-gradient(to bottom, #f0d8e5, #c5e1e6, #f0d8e5)";
document.body.appendChild(animateHead);

const animateTail = document.createElement("div");
animateTail.classList.add("animate-tails");
animateTail.style.backgroundImage = "linear-gradient(to bottom, #c5e1e6, #f0d8e5, #c5e1e6)";
document.body.appendChild(animateTail);

// Hide coin when animation is done
setTimeout(() => {
  coin.classList.remove(...Object.values(ANIMATE_CLASSES));
}, 3000);
