// Defines the blueprint for creating and managing each stone obstacle in the game.
class Stone {
    // The constructor is called when a new Stone object is created (e.g., new Stone('stone1', 2)).
    // It requires the ID of the HTML element for this stone and its fixed vertical position.
    constructor(elementId, bottomPosition) {
        // Finds the stone's corresponding HTML <img> element by its ID and saves a reference to it.
        this.element = document.getElementById(elementId);
        // Sets the initial horizontal position far off-screen to the left, so it's not visible at the start.
        this.left = -100;
        // Assigns the stone's width from a global constant.
        this.width = STONE_WIDTH;
        // Assigns the stone's height from a global constant.
        this.height = STONE_HEIGHT;
        // Sets the fixed vertical position for the stone, determining which lane it belongs to.
        this.bottom = bottomPosition;
        
        // Sets the visual width of the stone's HTML element using a percentage.
        this.element.style.width = this.width + '%';
        // Sets the visual height of the stone's HTML element.
        this.element.style.height = this.height + '%';
        // Sets the visual vertical position of the stone's HTML element.
        this.element.style.bottom = this.bottom + '%';
        
        // Calls the updateStyle method to apply the initial horizontal position to the element's CSS.
        this.updateStyle();
    }

    // This method updates the stone's position to move it leftwards across the screen.
    // It takes the current game speed as an argument.
    move(speed) {
        // Decrements the horizontal 'left' position by the current speed value.
        this.left -= speed;
    }

    // This method checks if the stone has moved off-screen and, if so, gives it a new random starting position.
    // It takes an array of other stones to check against to avoid creating impossible blockades.
    resetIfNeeded(stonesToCheck, carWidth, spaceBtw) {
        // Checks if the stone's left edge has passed the left side of the screen (position 0).
        if (this.left <= 0) {
            // Declares variables to hold the proposed new position and a flag for checking overlaps.
            let newPosition, isOverlapping;
            // Starts a loop that will continue guessing a new position until a "safe" one is found.
            do {
                // Resets the overlap flag to false for each new guess.
                isOverlapping = false;
                // Generates a random horizontal starting position in a "spawn zone" just off-screen to the right (between 100% and 200%).
                newPosition = Math.random() * (200 - 100) + 100;
                // Loops through each of the stones in the other lanes to check for potential conflicts.
                for (const otherStone of stonesToCheck) {
                    // A safeguard to skip checking the stone against itself, making the function more robust.
                    if (otherStone === this) continue;
                    // This is the core logic to prevent creating impossible-to-pass "walls" of stones.
                    // It checks if the horizontal distance to another stone is less than the car's width plus a safety buffer.
                    if (Math.abs((newPosition % 100) - (otherStone.left % 100)) <= (carWidth + spaceBtw)) {
                        // If the new position is too close to another stone, set the flag to true.
                        isOverlapping = true;
                        // Exit the inner 'for' loop immediately since we've already found a conflict.
                        break;
                    }
                }
            // If the 'isOverlapping' flag was set to true, the 'do...while' loop runs again to find a new position.
            } while (isOverlapping);
            // Once a safe position is found, assign it to the stone.
            this.left = newPosition;
        }
    }

    // This method syncs the stone's internal 'left' position with its visual CSS style.
    updateStyle() {
        // Updates the 'left' CSS property of the HTML element to visually move the stone.
        this.element.style.left = this.left + '%';
    }

    // This method instantly moves the stone to a specific starting position, used for resetting the game.
    hardReset(startLeft) {
        // Sets the stone's horizontal position to the provided value.
        this.left = startLeft;
        // Immediately updates the stone's visual position on the screen.
        this.updateStyle();
    }
}