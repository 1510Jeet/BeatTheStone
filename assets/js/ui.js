// --- DOM Element References ---
// This object stores references to all the important HTML elements used in the game.
// Storing them once here is more efficient than searching for them every time they are needed.
const ui = {
    // A reference to the car's <img> element.
    car: document.getElementById('car'),
    // A reference to the <p> element that displays the current score.
    scoreText: document.getElementById('score'),
    // A reference to the <p> element that displays the high score.
    highScoreText: document.getElementById('highScore'),
    // A reference to the "Start" <button> element.
    startBtn: document.getElementById('startBtn'),
    // A reference to the "Restart" <button> element, found by its class name.
    restartBtn: document.querySelector('.rbtn'),
    // A reference to the <div> that contains the game instructions.
    instructions: document.getElementById('game-instructions'),
    // A reference to the <audio> element for the car's movement sound.
    moveSound: document.getElementById('moveSound'),
    // A reference to the <audio> element for the game over sound.
    gameoverSound: document.getElementById('gameoverSound')
};

// --- UI Update Functions ---
// This function updates the score text on the screen.
// It takes the current score as an argument.
function updateScoreDisplay(score) {
    // Sets the text content of the score element to display the new score value.
    ui.scoreText.textContent = "Score: " + score;
}

// This function updates the high score text on the screen.
// It takes the current high score as an argument.
function updateHighScoreDisplay(highScore) {
    // Sets the text content of the high score element to display the new high score value.
    ui.highScoreText.textContent = "High Score: " + highScore;
}

// This function shows the elements for the game over/restart screen.
function showRestartScreen() {
    // Changes the CSS 'display' property of the restart button to 'block', making it visible.
    ui.restartBtn.style.display = "block";
    // Makes the instructions visible again on the game over screen.
    ui.instructions.style.display = "block";
}

// This function hides the elements on the initial start screen.
function hideStartScreen() {
    // Changes the CSS 'display' property of the start button to 'none', making it invisible.
    ui.startBtn.style.display = "none";
    // Also hides the instructions when the game starts.
    ui.instructions.style.display = "none";
}

// This function hides the elements on the restart screen when the player starts a new game.
function hideRestartScreen() {
    // Hides the restart button.
    ui.restartBtn.style.display = "none";
    // Hides the instructions.
    ui.instructions.style.display = "none";
}