# Module 3 - JS DOM Manipulation and timing

Pig Dice Game - a simple dice game with JavaScript and a page preloader with a percentage (counter) using setInterval(). Comments in the script.js explain each step.

## Game Rules

- 2 player game, playing in rounds.
- The default Winning Score is 100, it is possible to set a different Winning Score in 'Input Final Score'.
- In each turn, a player rolls the dice as many times as they wish.
- If player clicks 'Hold', the score for the Round is added to the Total score. Then it is the other players turn.
- If a player rolls two Ones (1) - they loose their ROUND Score and it is next players turn.
- If a player rolls two 6's - they loose their TOTAL Score and it is the next players turn.

## JavaScript in the project

- A page preloader. Using setInterval() for the percentage countdown and the width of the page overlay color equals to the percentage of the countdown.
- Using addEventListener for button clicks - New Game, Hold and Rolling Dice.
- Using Math.floor(Math.random) for randomly 'rolling' the Dice and fetching the appropriate dice-png files.
- Adding and removing classes to the Player Panels, depending on which player is playing.
- Display a message to the relevant player if they roll two 1's or rolls two 6's two times in a row.
- Add a function checking if the last Dice rolled where
- Click Hold - adds Round Score to players Total Score.
- Function to check if players last dice was two 6's - and if previous throw had two 6's - then reset the TOTAL score and call next players turn.
- Ability to set a Winning Score with Input.
- Removing and showing dice.
- A function to check if player has reached Winning Score each round. If they have - display WINNER. If not then call Next Players turn.
- Reseting last dice thrown when calling next players turn.

[Play game here](https://)
