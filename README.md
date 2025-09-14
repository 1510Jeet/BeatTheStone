# 🚗 Beat The Stone

![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript)

A simple, addictive, and endless retro-style car game built with pure Vanilla JavaScript as a personal learning project. Dodge the obstacles and see how high you can score!



---

## 👨‍💻 The Story Behind the Game

This project started out of sheer boredom. I had downloaded a 24-hour JavaScript tutorial, determined to master the language. A few hours in, I realized passively watching videos wasn't for me.

I thought to myself, "What's a better way to learn than by actually building something fun?"

So, I closed the tutorial and opened a blank code editor. This game is the result—a project born from a desire to learn by doing, one feature and one bug at a time.

---

## ✨ Features

-   **Endless Gameplay:** The road never ends! The game gets progressively faster and more challenging.
-   **Responsive Design:** Playable on both desktop and mobile (landscape mode).
-   **High Score Tracking:** Your high score is saved in the browser's local storage.
-   **Sound Effects:** Simple audio cues for movement and game over.
-   **Clean & Modular Code:** The project is structured into logical files, making it easy to understand and maintain.

---

## 🎮 How to Play

**Desktop:**
-   Press the **▲ (Up Arrow)** key to move to the lane above.
-   Press the **▼ (Down Arrow)** key to move to the lane below.

**Mobile:**
-   **Tap the top half** of the screen to move up.
-   **Tap the bottom half** of the screen to move down.

---

## 🚀 The 10-Step Evolution

This game wasn't built in a day. It was an iterative process of adding one feature at a time. Here's the journey it took:

1.  **The Prototype:** The first version had stones that moved across the screen but followed a **fixed, repeating pattern instead of spawning randomly**. The car moved up and down instantly with no transition, and there were no buttons to start or restart.

2.  **Smooth Moves:** Implemented a smooth transition animation for the car's lane changes using JavaScript functions.

3.  **Random Chaos:** Added the core gameplay loop—making stones spawn randomly off-screen and move towards the player.

4.  **A Proper Beginning & End:** Introduced the "Start" button to begin the game and a "Restart" button that appears on game over.

5.  **Adding Audio 🔊:** Integrated simple sound effects for car movement and the crash sequence.

6.  **The OOP Refactor:** Rewrote the entire monolithic codebase to be **Object-Oriented**. Hardcoded values were removed and replaced with variables and constants, making the game much cleaner.

7.  **Going Mobile 📱:** Added touch controls and an orientation-lock screen to make the game fully playable on mobile devices.

8.  **First Steps to Modularity:** Broke the monolithic JavaScript file into separate files for the first time to improve organization.

9.  **True Modularity 📂:** Fully restructured the project into a clean, modular architecture with well-defined files and directories (`js/`, `css/`, `assets/`).

10. **The Gemini Collaboration 🤖:** Used **Google's Gemini** to perform a final review and add detailed, line-by-line comments to every single file. This was done to solidify my own understanding and to make the codebase incredibly easy to read, maintain, and debug for any future updates.

---

## 🛠️ A Note on Tools & Collaboration

This project was a solo journey to learn JavaScript, and I wrote the core gameplay logic, structure, and functionality from scratch, while the CSS was done with help of my friend.

As the project's complexity grew, I leveraged **Google's Gemini** as an AI pair programmer to help with specific, advanced tasks:
-   Refactoring the code into an Object-Oriented structure.
-   Guiding the final modular architecture.
-   Generating the comprehensive, line-by-line comments for maximum readability.

This collaborative approach between human and AI allowed me to focus on the core logic while learning best practices for creating maintainable and scalable code.

---

