// Game configuration constants
// This file centralizes all the "magic numbers" for the game, making it easy to tweak the gameplay and balance.

// The fixed horizontal position (as a percentage) of the car. 50 means it's always in the center.
const CAR_START_X = 50;
// The width of the car element (as a percentage of the screen width).
const CAR_WIDTH = 8;
// The width of the stone obstacle elements.
const STONE_WIDTH = 6;
// The height of the stone obstacle elements.
const STONE_HEIGHT = 20;

// A value to shrink the car's invisible collision box horizontally, making collisions feel more fair.
const HITBOX_PADDING_X = 3;
// A value to shrink the car's invisible collision box vertically.
const HITBOX_PADDING_Y = 15;

// The initial speed at which the stones move when the game starts.
const INITIAL_SPEED = 0.168;
// The initial delay (in milliseconds) between each frame of the game loop. A lower number means a faster game.
const INITIAL_DELAY = 2.62;

// The minimum horizontal gap required between stones when they respawn to ensure the path is never unfairly blocked.
const SPAWN_GAP_X = 11;

// The vertical position (as a percentage from the bottom) where the first (bottom-most) lane is located.
const LANE_Y_START = 2;
// The vertical distance between the center of one lane and the center of the next.
const LANE_SPACING = 37;
// The calculated "invisible wall" at the bottom of the road, preventing the car from moving too low.
const MIN_CAR_Y = LANE_Y_START + 8;
// The calculated "invisible wall" at the top of the road, preventing the car from moving too high.
const MAX_CAR_Y = LANE_Y_START + (LANE_SPACING * 2) - 8;
// An array that stores the precise vertical center-line positions for each of the three lanes, used for collision detection.
const LANE_Y_POSITIONS = [LANE_Y_START, LANE_Y_START + LANE_SPACING, LANE_Y_START + (LANE_SPACING * 2)];