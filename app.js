// Document Elements
const gameLevels = document.querySelector('.difficulty-levels'),
  easyMode = document.querySelector('button.easy'),
  moderateMode = document.querySelector('button.moderate'),
  hardMode = document.querySelector('button.hard'),
  levelInfo = document.querySelector('h4.info-heading'),
  guessInput = document.querySelector('#guess-input'),
  guessButton = document.querySelector('button.guess'),
  resultArea = document.querySelector('.result-area'),
  resultMsg = resultArea.querySelector('#result-msg'),
  guessMsg = resultArea.querySelector('#guess-left'),
  resultImage = resultArea.querySelector('.result-image');

// Load All Event listners
loadAllEventListners();

// Change Game Level
function changeGameLevel(e) {
  if (e.target.classList.contains('level')) {
    // Show the level as Activated
    activateLevel(e);

    // Change the information based on selected level
    changeLevelInfo(e);

    // Generate a random number based on selected level
    generateRandomNumber(e.target);

    // Add deactivated style to the level and make it enabled
    Array.from(gameLevels.children).forEach(element => {
      if (element.classList.contains('active') && element != e.target) {
        element.classList.remove('active');
        element.disabled = false;
      }
    });

    // Remove input error border and placehodler on focus
    removeBorderAndPlaceholder();
  }
}

// Show the level style as Activated
function activateLevel(e) {
  e.target.classList.add('active');
  Array.from(gameLevels.children).forEach(element => {
    if (!element.classList.contains('active')) {
      element.disabled = true;
    }
  });
  e.target.disabled = true;
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.placeholder = 'Now type here';
  displayInstructions();
}

// Change the information based on selected level
function changeLevelInfo(e) {
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
}

// Generate a random number based on selected level
let randomNumber = null;
function generateRandomNumber(level) {
  if (level.classList.contains('easy')) {
    randomNumber = Math.floor(Math.random() * 10 + 1);
  } else if (level.classList.contains('moderate')) {
    randomNumber = Math.floor(Math.random() * 25 + 1);
  } else if (level.classList.contains('hard')) {
    randomNumber = Math.floor(Math.random() * 50 + 1);
  }
}

// Displays instructions
function displayInstructions() {
  resultMsg.style.color = '#badc57';
  guessMsg.style.color = '#badc57';
  resultMsg.textContent = 'Now enter your guess';
  guessMsg.textContent = 'in the input above.';
  resultArea.style.display = 'block';
}

// Remove border and change placeholder on input focus
function removeBorderAndPlaceholder() {
  guessInput.classList.remove('no-input');
  guessInput.placeholder = 'Type here!';
}

// Check result
function checkResult() {
  if (guessButton.textContent === 'Guess') {
    if (guessInput.value === '') {
      displayNoInputError();
    } else {
      guessInput.classList.remove('no-input');

      if (parseFloat(guessInput.value) === randomNumber) {
        console.log('Matched');
        displayWinningMsg();
      } else {
        calculateAttemptsLeft();
      }
    }
  } else if (guessButton.textContent === 'NEW GAME') {
    resetGame();
  }
}

// Display no input error
function displayNoInputError() {
  guessInput.classList.add('no-input');
  guessInput.placeholder = 'here ?';
  resultMsg.style.color = '#f5744d';
  guessMsg.style.color = '#f5744d';
  resultMsg.textContent = 'No guess entered!';
  guessMsg.textContent = 'First enter your guess then click Guess';
  resultArea.style.display = 'block';
}

// Display winning message
function displayWinningMsg() {
  // Disable elements
  guessInput.disabled = 'true';
  Array.from(gameLevels.children).forEach(element => {
    element.disabled = 'true';
  });

  // Style elements
  resultMsg.style.color = '#6AB04A';
  guessMsg.style.color = '#f5e169';
  resultMsg.textContent = 'Correct Guess!';
  guessMsg.textContent = 'You Won!';
  resultArea.style.display = 'block';
  guessButton.textContent = 'NEW GAME';
  resultImage.innerHTML = '<img src="./img/winner.png">';
}

// Calculate attempts(guesses) left
let attemptsLeft = 3;
function calculateAttemptsLeft() {
  let attemptsDisplayed = parseFloat(guessMsg.textContent.split(' ')[1]);
  if (isNaN(attemptsDisplayed)) {
    displayAttemptsLeft(attemptsLeft);
    attemptsLeft--;
  } else if (attemptsDisplayed > 1 && attemptsDisplayed <= 3) {
    displayAttemptsLeft(attemptsLeft);
    attemptsLeft--;
  } else if (attemptsDisplayed === 1) {
    gameOver();
  }
}

// Display attempts left
function displayAttemptsLeft(attemptsLeft) {
  resultMsg.style.color = '#f5744d';
  guessMsg.style.color = '#f5744d';
  resultMsg.textContent = 'Wrong Guess!';
  resultImage.innerHTML = '<img src="./img/wrong.png">';
  if (attemptsLeft > 1) {
    guessMsg.textContent = `Only ${attemptsLeft} guesses are left.`;
  } else {
    guessMsg.textContent = `Only ${attemptsLeft} guess is left.`;
  }

  resultArea.style.display = 'block';
}

// Show game over
function gameOver() {
  guessInput.disabled = 'true';
  guessButton.textContent = 'NEW GAME';
  resultMsg.style.color = '#f5744d';
  guessMsg.style.color = '#f5744d';
  resultMsg.textContent = '';
  guessMsg.textContent = 'GAME OVER!';
  resultImage.innerHTML = '<img src="./img/gameover.png">';
  resultArea.style.display = 'block';

  // Disable level selecting buttons
  Array.from(gameLevels.children).forEach(element => {
    element.disabled = 'true';
  });
}

// Reset game
function resetGame() {
  location.reload(true);
}

// Event Listeners
function loadAllEventListners() {
  gameLevels.addEventListener('click', changeGameLevel);
  guessButton.addEventListener('click', checkResult);
  guessInput.addEventListener('focus', removeBorderAndPlaceholder);
}
