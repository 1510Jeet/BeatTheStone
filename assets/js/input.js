function initializeInputHandlers() {
    document.addEventListener('keydown', (event) => {
        if (!gameState.game) return;
        
        if (event.key === 'ArrowUp' && gameState.car_up === 0 && gameState.carPosition < MAX_CAR_Y) {
            ui.moveSound.play();
            moveCarUp();
        } else if (event.key === 'ArrowDown' && gameState.car_down === 0 && gameState.carPosition > MIN_CAR_Y) {
            ui.moveSound.play();
            moveCarDown();
        }
    });

    document.addEventListener('touchstart', (event) => {
        if (!gameState.game) return;
        
        const touchY = event.touches[0].clientY;
        const middleOfScreen = window.innerHeight / 2;

        if (touchY < middleOfScreen) { // Touched upper half
            if (gameState.car_up === 0 && gameState.carPosition < MAX_CAR_Y) {
                ui.moveSound.play();
                moveCarUp();
            }
        } else { // Touched lower half
            if (gameState.car_down === 0 && gameState.carPosition > MIN_CAR_Y) {
                ui.moveSound.play();
                moveCarDown();
            }
        }
    });
}