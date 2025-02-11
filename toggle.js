//* go back buttons
const gb1 = document.getElementById('goBack1');

//* go next buttons
const gn1 = document.getElementById('goNext1');

//* status for who turn it is to break (flip-flop)
const stat1 = document.getElementById('status1');
const stat2 = document.getElementById('status2');

//* for frame pairs
const set1Divs = document.querySelectorAll("#set1 > div");
const set2Divs = document.querySelectorAll("#set2 > div");
const totalDivs = set1Divs.length;
let currentIndex = 0;

//* set initial colors up front
//^ this will prevent a second click lag
stat1.style.color = "cyan";
stat2.style.color = "black";

function updateDivVisibility() {
  //* hide all divs
  set1Divs.forEach(div => div.classList.add('hidden'));
  set2Divs.forEach(div => div.classList.add('hidden'));
  //* Show the current pair
  set1Divs[currentIndex].classList.remove('hidden');
  set2Divs[currentIndex].classList.remove('hidden');
}

//* next button
gn1.addEventListener('click', () => {
  gb1.style.display = "block";
  currentIndex++;
  if(currentIndex >= totalDivs){
    currentIndex = 0;
  }
  //* flip flop colors
  if (stat1.style.color === "cyan") {    
    stat1.style.color = "black";
    stat2.style.color = "cyan";
  } else {
    stat1.style.color = "cyan";
    stat2.style.color = "black";
  }
  updateDivVisibility();
});

//* back button
gb1.addEventListener('click', () => {
  currentIndex--;
  if(currentIndex < 0) {
    currentIndex = totalDivs - 1; //* loop back to the end
  }
  //* reverse flip - flop on colors
  if (stat1.style.color === "cyan") {
    stat1.style.color = "black";
    stat2.style.color = "cyan";
  } else {
    stat1.style.color = "cyan";
    stat2.style.color = "black";
  }
  updateDivVisibility();
});
updateDivVisibility();


