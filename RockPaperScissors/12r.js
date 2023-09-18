let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}.png" class="move-icon">
<img src="images/${computerMove}.png" class="move-icon">
Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
};

let isAutoPlaying=false;
let intervalId;


function autoPlay(){
  if(!isAutoPlaying){
    intervalId = setInterval(() => {
      playGame(pickComputerMove());
    },1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-js').innerHTML='Stop playing';
  }else{
    clearInterval(intervalId)
    document.querySelector('.auto-play-js').innerHTML='Auto play';
    isAutoPlaying=false;
  }

};

function reset(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}



function confirmReset(){
  document.querySelector('.confirmation').innerHTML=
  `Are you sure you want to reset the score?
  <button class="confirm">Yes</button>
  <button class="deny">No</button>
  `; 

  document.querySelector('.confirm').addEventListener('click',()=>{
    document.querySelector('.confirmation').innerHTML='';
    reset()
  })

  document.querySelector('.deny').addEventListener('click',()=>{
    document.querySelector('.confirmation').innerHTML='';
  })
}




document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    playGame('rock');
  } else if (event.key==='p'){
    playGame('paper');
  } else if (event.key==='s'){
    playGame('scissors');
  }else if (event.key==='a'){
    autoPlay();
  }else if (event.key==='Backspace'){
    confirmReset();
  }
});

document.querySelector('.auto-play-js').addEventListener('click',()=>{
  autoPlay();
});

document.querySelector('.reset-js').addEventListener('click',()=>{
  confirmReset();
});

