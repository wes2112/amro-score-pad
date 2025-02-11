//* store names in session storage

document.getElementById('submit').addEventListener('click', function(e) {
  e.preventDefault();
  //* get players names
  const player1Name = document.getElementById("player1").value;
  const player2Name = document.getElementById("player2").value;
  //* store name in session storage
  sessionStorage.setItem('storedName1', player1Name);
  sessionStorage.setItem('storedName2', player2Name);
  //* redirect name to next page
  window.location.href = "./game-field.html";
  
});