# Mutation Protocol

## Overview

Mutation Protocol is a 2D top-down zombie survival game developed using Phaser.js. The objective is to survive against continuously spawning waves of zombies while collecting experience points (XP), leveling up, and managing player health.

The game features automatic targeting and shooting mechanics, progressive difficulty scaling, wave progression, and a simple survival-based gameplay loop inspired by modern survival arena games.

---

## Features

### Player System

* Keyboard-based movement using arrow keys
* Health management system
* Automatic targeting and shooting of the nearest enemy

### Enemy System

* Zombies spawn from random edges of the map
* Zombies actively pursue the player
* Enemy movement speed increases as the player progresses

### Progression System

* Experience points (XP) earned by defeating zombies
* Level-up system with increasing XP requirements
* Wave progression tracking
* Difficulty scaling based on player level

### Combat System

* Auto-fired projectiles
* Nearest-enemy targeting logic
* Enemy elimination and XP gem drops

### Collectibles

* XP gems dropped upon enemy defeat
* Magnet-style XP collection when the player is nearby

### Game States

* Real-time gameplay
* Health tracking
* Game Over screen when player health reaches zero

---

## Technologies Used

* JavaScript (ES6)
* Phaser.js 3
* HTML5
* CSS3

---

## Project Structure

```
MutationProtocol/
│
├── assets/
│   ├── bullets/
│   ├── player/
│   ├── tiles/
│   └── zombie/
│
├── game.js
├── index.html
├── style.css
└── README.md
```

---

## How to Run

1. Clone the repository:

```bash
git clone <repository-url>
```

2. Open the project folder in Visual Studio Code.

3. Run the project using Live Server or any local development server.

4. Open the generated local URL in a browser.

---

## Gameplay

* Move the player using the arrow keys.
* Survive incoming zombie waves.
* Defeat zombies to collect XP gems.
* Level up by earning XP.
* Avoid taking damage from enemies.
* Survive as long as possible and reach higher waves.

---

## Future Improvements

* Multiple enemy types
* Boss encounters
* Upgrade selection system
* Sound effects and background music
* Score tracking and leaderboard
* Main menu and restart system
* Additional weapons and abilities

---

## Author

Manoj J
