const gameLevels = document.querySelector('.difficulty-levels'),
  easyMode = document.querySelector('button.easy'),
  moderateMode = document.querySelector('button.moderate'),
  hardMode = document.querySelector('button.hard'),
  levelInfo = document.querySelector('h4.info-heading'),
  guessInput = document.querySelector('#guess-input'),
  guessButton = document.querySelector('button.guess'),
  resultArea = document.querySelector('.result-area');

// Change Game Level
function changeGameLevel(e) {
  if (e.target.classList.contains('level')) {
    e.target.classList.add('active');
    e.target.disabled = true;
    guessInput.disabled = false;
    guessInput.placeholder = 'Now type here';
    Array.from(gameLevels.children).forEach(element => {
      if (element.classList.contains('active') && element != e.target) {
        element.classList.remove('active');
        element.disabled = false;
      }
    });

    // Change level info
    if (e.target.classList.contains('easy')) {
      levelInfo.textContent = `Guess a number between 1 and 10`;
      levelInfo.style.color = '#4cb648';
    } else if (e.target.classList.contains('moderate')) {
      levelInfo.textContent = `Guess a number between 1 and 25`;
      levelInfo.style.color = '#fcc72c';
    } else if (e.target.classList.contains('hard')) {
      levelInfo.textContent = `Guess a number between 1 and 50`;
      levelInfo.style.color = '#f5744d';
    }

    // Generate random number
    generateRandomNumber(e.target);
  }
}

// Generate random number based on selected level
let randomNumber = 0;
function generateRandomNumber(level) {
  if (level.classList.contains('easy')) {
    randomNumber = Math.floor(Math.random() * 10 + 1);
  } else if (level.classList.contains('moderate')) {
    randomNumber = Math.floor(Math.random() * 25 + 1);
  } else if (level.classList.contains('hard')) {
    randomNumber = Math.floor(Math.random() * 50 + 1);
  }
}

// Check result
function checkResult(e) {
  if (parseFloat(guessInput.value) === randomNumber) {
    console.log('Matched');
    resultArea.style.display = 'block';
    guessButton.textContent = 'Play Again';
  } else {
    attemptsLeft();
  }
}

// Display attempts left
function attemptsLeft() {
  let guessLeft = 3;
  const resultMsg = resultArea.querySelector('#result-msg');
  const guessMsg = resultArea.querySelector('#guess-left');

  resultMsg.textContent = 'Wrong Guess!';
  guessMsg.textContent = `Only ${guessLeft} guesses are left.`;
  resultArea.style.display = 'block';
}

// Event Listener
gameLevels.addEventListener('click', changeGameLevel);
guessButton.addEventListener('click', checkResult);
