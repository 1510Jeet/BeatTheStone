// --- Game State ---
// This object holds all the important, changeable data for the game.
let gameState = {
    // A boolean to track if the game is currently running or paused/on the menu.
    game: false,
    // The player's score for the current session, starts at 0.
    score: 0,
    // Retrieves the saved high score from the browser's local storage. If none is found, it defaults to 0.
    highScore: localStorage.getItem("highScore") || 0,
    // The car's current vertical position (as a percentage), which will be updated during gameplay.
    carPosition: 0,
    // The current horizontal speed of the stones, which increases over time.
    speed_stone: 0,
    // The delay in milliseconds between each game loop update. A smaller number means a faster game.
    time_delay: 0,
    // A counter to manage the "move up" animation and prevent multiple moves at once.
    car_up: 0,
    // A counter to manage the "move down" animation and prevent multiple moves at once.
    car_down: 0
};

// --- Stone Initialization ---
// Creates an array for the two stones in the bottom lane, instantiating them with their element IDs and vertical positions.
const lane1Stones = [new Stone('stone1', LANE_Y_POSITIONS[0] - 1), new Stone('stone11', LANE_Y_POSITIONS[0] - 1)];
// Creates an array for the two stones in the middle lane.
const lane2Stones = [new Stone('stone2', LANE_Y_POSITIONS[1] + 1), new Stone('stone21', LANE_Y_POSITIONS[1] + 1)];
// Creates an array for the two stones in the top lane.
const lane3Stones = [new Stone('stone3', LANE_Y_POSITIONS[2]), new Stone('stone31', LANE_Y_POSITIONS[2])];
// Creates a single master array containing all six stones for easier processing in the game loop.
const allStones = [...lane1Stones, ...lane2Stones, ...lane3Stones];

// --- Core Game Logic ---
// This function checks if the car has collided with any of the stones.
function checkForCollision() {
    // Gets the fixed horizontal position of the car's left edge.
    const carLeft = CAR_START_X;
    // Calculates the horizontal position of the car's right edge, accounting for hitbox padding to make it feel fair.
    const carRight = CAR_START_X + CAR_WIDTH - HITBOX_PADDING_X;
    // Gets the height of a stone, used for the vertical collision check.
    const stone_height = allStones[0].height;

    // A helper function to determine if the car and a given stone are overlapping horizontally.
    const isHorizontallyColliding = (stone) => !(carRight < stone.left || carLeft > (stone.left + stone.width - 1));

    // Checks for a collision in Lane 1: first checks vertical alignment, then checks horizontal overlap with either stone in that lane.
    if (gameState.carPosition >= LANE_Y_POSITIONS[0] && gameState.carPosition <= LANE_Y_POSITIONS[0] + stone_height - HITBOX_PADDING_Y && (isHorizontallyColliding(lane1Stones[0]) || isHorizontallyColliding(lane1Stones[1]))) return true;
    // Checks for a collision in Lane 2.
    if (gameState.carPosition >= LANE_Y_POSITIONS[1] && gameState.carPosition <= LANE_Y_POSITIONS[1] + stone_height - HITBOX_PADDING_Y && (isHorizontallyColliding(lane2Stones[0]) || isHorizontallyColliding(lane2Stones[1]))) return true;
    // Checks for a collision in Lane 3.
    if (gameState.carPosition >= LANE_Y_POSITIONS[2] && gameState.carPosition <= LANE_Y_POSITIONS[2] + stone_height - HITBOX_PADDING_Y && (isHorizontallyColliding(lane3Stones[0]) || isHorizontallyColliding(lane3Stones[1]))) return true;
    
    // If no collisions are found in any lane, return false.
    return false;
}

// This function is called every frame to update the game world.
function updateGame() {
    // Loops through every stone to update its position based on the current speed and refresh its style on the screen.
    allStones.forEach(s => { s.move(gameState.speed_stone); s.updateStyle(); });
    // For stones in lane 1, check if they need to be reset (respawned), passing in stones from other lanes to avoid creating impossible blocks.
    lane1Stones.forEach(s => s.resetIfNeeded([...lane2Stones, ...lane3Stones], CAR_WIDTH, SPAWN_GAP_X));
    // Checks the stones in lane 2 for respawning.
    lane2Stones.forEach(s => s.resetIfNeeded([...lane1Stones, ...lane3Stones], CAR_WIDTH, SPAWN_GAP_X));
    // Checks the stones in lane 3 for respawning.
    lane3Stones.forEach(s => s.resetIfNeeded([...lane1Stones, ...lane2Stones], CAR_WIDTH, SPAWN_GAP_X));
    
    // After all movements and resets, check if a collision has occurred.
    if (checkForCollision()) {
        // If a collision is detected, play the game over sound.
        ui.gameoverSound.play();
        // Set the game state to inactive, which will stop all game loops.
        gameState.game = false;
        // Display the "Restart" button and instructions.
        showRestartScreen();
    }
}

// --- Car Movement ---
// This function animates the car moving down one lane.
function moveCarDown() {
    // Only execute the move if the game is currently active.
    if (gameState.game) setTimeout(() => {
        // Continue the animation as long as the car hasn't moved the full distance of a lane.
        if (gameState.car_down < LANE_SPACING) {
            // Move the car's logical position down by a small amount.
            gameState.carPosition -= 0.5;
            // Update the car's visual position on the screen.
            ui.car.style.bottom = gameState.carPosition + '%';
            // Increment the animation counter to track progress.
            gameState.car_down += 0.5;
            // Call the function again to continue the animation loop.
            moveCarDown();
        } else {
            // Once the animation is complete, reset the counter to allow for the next move.
            gameState.car_down = 0;
        }
    }, 0.75); // A very small delay to create a smooth animation.
}

// This function animates the car moving up one lane.
function moveCarUp() {
    // Only execute the move if the game is currently active.
    if (gameState.game) setTimeout(() => {
        // Continue the animation as long as the car hasn't moved the full distance of a lane.
        if (gameState.car_up < LANE_SPACING) {
            // Move the car's logical position up by a small amount.
            gameState.carPosition += 0.5;
            // Update the car's visual position on the screen.
            ui.car.style.bottom = gameState.carPosition + '%';
            // Increment the animation counter to track progress.
            gameState.car_up += 0.5;
            // Call the function again to continue the animation loop.
            moveCarUp();
        } else {
            // Once the animation is complete, reset the counter to allow for the next move.
            gameState.car_up = 0;
        }
    }, 0.75); // A very small delay to create a smooth animation.
}

// --- Game Loops ---
// The main game loop, which acts as the "heartbeat" of the game.
function gameLoop() {
    // Only run if the game is active.
    if (gameState.game) setTimeout(() => {
        // Process all game logic for a single frame.
        updateGame();
        // Schedule the next frame, creating a recursive loop.
        gameLoop();
    }, gameState.time_delay); // The delay determines the game's frame rate.
}

// A separate loop to gradually make the game harder over time.
function increaseDifficulty() {
    // Only run if the game is active.
    if (gameState.game) setTimeout(() => {
        // Increase the stone speed by 1% of its current speed.
        gameState.speed_stone += gameState.speed_stone * 0.01;
        // Decrease the delay between frames by 1%, making the game faster.
        gameState.time_delay -= gameState.time_delay * 0.01;
        // Continue this loop as long as the game speed is not too fast.
        if (gameState.time_delay > 0.8) {
            // Schedule the next difficulty increase.
            increaseDifficulty();
        }
    }, 500); // This loop runs every half-second.
}

// A loop dedicated to increasing the player's score.
function increaseScore() {
    // Only run if the game is active.
    if (gameState.game) setTimeout(() => {
        // Increment the score by one.
        gameState.score++;
        // Update the score display on the screen.
        updateScoreDisplay(gameState.score);
        // Check if the current score has surpassed the high score.
        if (gameState.score >= gameState.highScore) {
            // If so, update the high score in our game state.
            gameState.highScore = gameState.score;
            // Update the high score display on the screen.
            updateHighScoreDisplay(gameState.highScore);
            // Save the new high score to the browser's local storage so it persists.
            localStorage.setItem("highScore", gameState.highScore);
        }
        // Schedule the next score increase.
        increaseScore();
    }, gameState.time_delay * 10); // The rate of scoring is tied to the game's difficulty.
}

// --- Game Start/Restart ---
// This function resets the game to its initial state.
function reStart() {
    // Reset the score to 0.
    gameState.score = 0;
    // Move the car back to the starting lane.
    gameState.carPosition = LANE_Y_START;
    // Update the car's visual position.
    ui.car.style.bottom = gameState.carPosition + '%';
    // Reset the game's speed/delay to the initial values.
    gameState.time_delay = INITIAL_DELAY;
    // Reset the stone speed to its initial value.
    gameState.speed_stone = INITIAL_SPEED;
    // Reset the car's movement animation locks.
    gameState.car_up = 0;
    gameState.car_down = 0;

    // Manually reset the positions of all stones to their starting off-screen locations.
    lane1Stones[0].hardReset(-40); lane1Stones[1].hardReset(-400);
    lane2Stones[0].hardReset(-400); lane2Stones[1].hardReset(-40);
    lane3Stones[0].hardReset(-40); lane3Stones[1].hardReset(-400);

    // Ensure the high score display is up-to-date.
    updateHighScoreDisplay(gameState.highScore);
    // Hide the restart button and instructions.
    hideRestartScreen();

    // Set the game state to active.
    gameState.game = true;
    // Kick off the score-increasing loop.
    increaseScore();
    // Kick off the main game loop.
    gameLoop();
    // Kick off the difficulty-increasing loop.
    increaseDifficulty();
}

// This function is called when the player clicks the "Start" button.
function start() {
    // Hide the initial start button and instructions.
    hideStartScreen();
    // Call the reStart function to set up and begin the game.
    reStart();
}

// --- Initialization ---
// This function sets up the initial state of the application when the page loads.
function init() {
    // Display the saved high score when the game first loads.
    updateHighScoreDisplay(gameState.highScore);
    // Attach the `start` function to the "Start" button's click event.
    ui.startBtn.addEventListener('click', start);
    // Attach the `reStart` function to the "Restart" button's click event.
    ui.restartBtn.addEventListener('click', reStart);
    // Activate the keyboard and touch listeners for player input.
    initializeInputHandlers();
}

// This is the very first thing that runs, kicking off the entire game setup process.
init();