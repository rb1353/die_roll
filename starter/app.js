/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//math is a built in property for javascript
//dice = Math.floor(Math.random()*6 + 1);
//console.log(dice);

//use belows to call the DOM. THis allows us to select queries in html
// # to select ID like in CSS - textContent allows us to choose what to change query to(only plain text)
//because of type coercion, Js will auto change the variable
//document.querySelector('#current-' + activePlayer).textContent = dice;

//using innerHTML, we have to designate when it is a string, otherwise
//Js will believe it is javascript
//document.querySelector('#current-' + activePlayer).innerHTML= '<em>' + dice + '</em>'

//var x = document.querySelector('#score-0').textContent;

//using '.' allows us to select a class in the html doc
var scores, roundScore, activePlayer, gamePlaying;

//initialize game function
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;


document.querySelector('.dice').style.display = 'none';

//getElementById('id') is quicker
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
// document.querySelector('.btn-roll').addEventListener('click', btn);
/* no parenthesis
at the end of this function because we don't want to call it,
we want the event to call it */

//or below, an anonymous function if you only need to call it with the event
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying)  {
      //1.random number
      var dice = Math.floor(Math.random()*6 + 1);

      //2. display result
      var diceDOM = document.querySelector('.dice');
      diceDOM.style.display = 'block';
      diceDOM.src = 'dice-' + dice + '.png'


      //3. update round score, only if  rolled number is not 1
        if (dice !== 1) {
          //add to score
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
          //next player - ternary operater
          nextPlayer();

      }

    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
    //add current score to global score
      scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player wins
    if (scores[activePlayer] >= 10
    \) {
         document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
         document.querySelector('.dice').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamePlaying = false;
    } else {
      nextPlayer();
    }

    //switch to other user
  }
});

document.querySelector('.btn-new').addEventListener('click',init);

//fucntion used inside DOM to switch players
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
}

function init() {
  scores = [0,0];
  roundScore = 0;
  gamePlaying = true;
  document.getElementById('score-0').textContent = scores[0];
  document.getElementById('score-1').textContent = scores[1];
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //clear winner class from player panel
  document.getElementById('name-' + activePlayer).textContent = 'Player ' + (activePlayer + 1);
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}
