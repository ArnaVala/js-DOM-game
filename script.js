/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls the dice as many times as he wishes. Each result get added to his ROUND score.
- If the player rolls a 1, all his ROUND score gets lost.
- A player looses his ENTIRE score when he rolls two 6's in a row.
- The player can choose to 'Hold', which means that his ROUND score gets added to his ENTIRE score. After that, it's the next player's turn.
- You can set the FINAL SCORE INPUT - the amount to win game.

*/

// PRELOADER FUNCTIONS
// preloader with counter using setInterval

document.addEventListener('DOMContentLoaded', () => {
  let counter = document.querySelector('.counter');
  let loader = document.querySelector('.loader');
  let preloader = document.querySelector('.preloader');
  let count = 0; //counter starts at 0

  // Counter function - percentage 
  let counterFunction = setInterval(() => { // setInterval 
    if (count < 101) { 
      counter.textContent = `${count}%`; // if count is from 0-100 then display numbers and increase
      loader.style.width = `${count}%`; //loader increase width
      count++; //increase count
    } else { 
      clearInterval(counterFunction); // clearInterval() method stops the function set by setInterval()
      fadeOut(preloader);
    }
  }, 30); // set time it takes from 0-100%

  // FADEOUT - after loading animation 
  function fadeOut(element) {
    element.style.opacity = 1;

    (function fade() {
      if ((element.style.opacity -= .1) < 0) {
        element.style.display = 'none';
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }
})

// GAME FUNCTIONS

// SCOPES

var scores, roundScore, activePlayer, gamePlaying, dice1, dice2, lastDice1, lastDice2, msgInfo;

init();

// SCORE FUNCTIONS

document.querySelector('.btn-roll').addEventListener('click', function () {
  // Game is playing - don't need to set true or false
  // btn won't work
  if (gamePlaying) {
    // 1.random number
    // dice set random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
  
    // 2. Display results
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    // Attach dice images 'dice + diceNumber + .png
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
    // Display results from rolling dice
    document.querySelector('#msg-0').textContent = '';   //for player 1
    document.querySelector('#msg-1').textContent = '';   //for player 2

    // 3. Update ROUND score -
    // if two 6's in a row you loose TOTAL score
    if ((dice1 === 6 && lastDice1 === 6) || (dice1 === 6 && lastDice2 === 6) || (dice2 === 6 && lastDice1 === 6) || (dice2 === 6 && lastDice2 === 6)) {
      scores[activePlayer] = 0; // zero players score
      msgInfo = "Rolled two 6's in a row"; // set msg to player loosing TOTAL score
      showMsg(msgInfo);
      document.querySelector('#score-' + activePlayer).textContent = '0';  // then set 0 score in DOM

      nextPlayer();   // call next players turn    
      lastDice1 = 0; // set 'lastDice' to 0, so it doesn't still count 6's
      lastDice2 = 0;
      
    } else if (dice1 !== 1 && dice2 !== 1) {// so if the player doesn't throw 2 ones then
      roundScore += dice1 + dice2; //update roundScore
      // pass the roundScore to the DOM
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      lastDice1 = dice1; // set lastDice to the previous dice throw
      lastDice2 = dice2;
      
    } else {// if throwing 2 ones
      msgInfo = 'Rolled two Ones'; // message displayed
      showMsg(msgInfo); // pass to msgInfo
      nextPlayer(); // call nextPlayers turn
      lastDice1 = 0;  // reset last dice to 0
      lastDice2 = 0;
    }
  }
});

// GAME CONTROL FUNCTIONS

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) { // Hold score if game is playing
    lastDice1 = 0;
    lastDice2 = 0;
    // add CURRENT score to TOTAL score
    scores[activePlayer] += roundScore;
    // Update UI - DOM
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('#final-score').value;
    var winningScore;
    
    // Undefined, 0, null, or '' are force to false
    // Anything else is to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100; //default is 100 to win
    }

    // check if player has won - has reached 100 points
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; // display 'Winner!' 
      //remove dice from DOM - display none
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector(".player-panel__" + activePlayer).classList.add("winner"); // add winner to player
      document.querySelector(".player-panel__" + activePlayer).classList.remove("active"); // remove active status to player
      gamePlaying = false; // remove gamePlaying 
    } else {
      nextPlayer(); //if player hasn't one, then nextPlayers turn
    }
  }
});

// NEXT PLAYER FUNCTION

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // and ROUNDS score set to 0 when player changed
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

   // UI on player change
  //use toggle removes class if it is there and removes accordingly
  document.querySelector(".player-panel__0").classList.toggle("active");
  document.querySelector(".player-panel__1").classList.toggle("active");
  // remove dice
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
  document.querySelector("#msg-" + activePlayer).textContent = "";
}

// NEW GAME - Pass INIT function
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0]; // reset scores to 0;
  activePlayer = 0; //player 1 starts
  roundScore = 0; // roundScore set to 0;
  gamePlaying = true; //game is playing

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  // set all values to 0
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // set player names -remove winner class
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("msg-0").textContent = "";
  document.getElementById("msg-1").textContent = "";

   document.querySelector(".player-panel__0").classList.remove("winner");
  document.querySelector(".player-panel__1").classList.remove("winner");
  document.querySelector(".player-panel__0").classList.remove("active");
  document.querySelector(".player-panel__1").classList.remove("active");

  // add active player again
  document.querySelector(".player-panel__0").classList.add("active");
}

//SHOW MESSAGE FUNCTION
function showMsg(msg) {
  document.getElementById('msg-' + activePlayer).innerHTML = msg;
}