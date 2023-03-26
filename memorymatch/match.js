const cards = document.querySelectorAll('.card');
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('match');
  secondCard.classList.add('match');
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  updateScore();

  let cards = document.querySelectorAll('.card');
  let matchedCards = document.querySelectorAll('.match');

  if (cards.length === matchedCards.length) {
    checkWin();
  }
  

  resetBoard();
}


function updateScore() {
  let score = document.getElementById('score');
  score.textContent = parseInt(score.textContent) + 1;
}



function unflipCards() {
  lockBoard = true;

  firstCard.classList.add('mismatch');
  secondCard.classList.add('mismatch');

  updateMisses();

  setTimeout(() => {
    firstCard.classList.remove('flipped', 'mismatch');
    secondCard.classList.remove('flipped', 'mismatch');

    resetBoard();
  }, 1500);
}

function updateMisses() {
  let misses = document.getElementById('misses');
  misses.textContent = parseInt(misses.textContent) + 1;
}

function checkWin() {
  let score = document.getElementById('score').textContent;
  let misses = document.getElementById('misses').textContent;

  if (score+2 > misses) {
    alert("You win! Congratulations!");
  } else {
    alert("You lose. Better luck next time!");
  }
}



function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();



cards.forEach(card => card.addEventListener('click', flipCard));
