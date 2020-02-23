// Document Elements
const gameLevels = document.querySelector('.difficulty-levels'),
  easyMode = document.querySelector('button.easy'),
  moderateMode = document.querySelector('button.moderate'),
  hardMode = document.querySelector('button.hard'),
  levelInfo = document.querySelector('h4.info-heading'),
  guessInput = document.querySelector('#guess-input'),
  guessButton = document.querySelector('button.guess'),
  resultArea = document.querySelector('.result-area');

// Load All Event listners
loadAllEventListners();

// Change Game Level
function changeGameLevel(e) {
  if (e.target.classList.contains('level')) {
    // Show the level as Activated
    activateLevel(e);

    // Change the information based on level
    changeLevelInfo(e);

    // Generate a random number to check the result based on selected level
    generateRandomNumber(e.target);

    // Deactivate the level and make it enabled
    Array.from(gameLevels.children).forEach(element => {
      if (element.classList.contains('active') && element != e.target) {
        element.classList.remove('active');
        element.disabled = false;
      }
    });

    // Remove border and change placeholder
    removeBorderAndPlaceholder();
  }
}

// Show the level as Activated
function activateLevel(e) {
  e.target.classList.add('active');
  e.target.disabled = true;
  guessInput.disabled = false;
  guessButton.disabled = false;
  guessInput.placeholder = 'Now type here';
}

// Change the information based on level
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

// Generate a random number to check the result based on selected level
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

// Remove border and change placeholder on input focus
function removeBorderAndPlaceholder() {
  guessInput.classList.remove('no-input');
  guessInput.placeholder = 'Now type here';
}

// Check result
function checkResult(e) {
  if (guessInput.value === '') {
    guessInput.classList.add('no-input');
    guessInput.placeholder = 'Enter Guess?';
  } else {
    guessInput.classList.remove('no-input');

    if (parseFloat(guessInput.value) === randomNumber) {
      console.log('Matched');
      resultArea.style.display = 'block';
      guessButton.textContent = 'Play Again';
    } else {
      attemptsLeft();
    }
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

// Event Listeners
function loadAllEventListners() {
  gameLevels.addEventListener('click', changeGameLevel);
  guessButton.addEventListener('click', checkResult);
  guessInput.addEventListener('focus', removeBorderAndPlaceholder);
}
