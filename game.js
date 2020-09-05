/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/

let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

let bgReady, heroReady, monsterReady;
let bgImage, heroImage, monsterImage;

let startTime = Date.now();
const SECONDS_PER_ROUND = 15;
let elapsedTime = 0;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/background.png";
  heroImage = new Image();
  heroImage.onload = function () {
    // show the hero image
    heroReady = true;
  };
  heroImage.src = "images/hero.png";

  monsterImage = new Image();
  monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
  };
  monsterImage.src = "images/monster.png";
}

/**
 * Setting up our characters.
 *
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 *
 * The same applies to the monster.
 */

let score = 0;
let heroX = canvas.width / 2;
let heroY = canvas.height / 2;

let monsterX = 100;
let monsterY = 100;

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  addEventListener(
    "keydown",
    function (key) {
      keysDown[key.keyCode] = true;
    },
    false
  );

  addEventListener(
    "keyup",
    function (key) {
      delete keysDown[key.keyCode];
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (38 in keysDown) {
    // Player is holding up key
    heroY -= 3;
  }
  if (40 in keysDown) {
    // Player is holding down key
    heroY += 3;
  }
  if (37 in keysDown) {
    // Player is holding left key
    heroX -= 3;
  }
  if (39 in keysDown) {
    // Player is holding right key
    heroX += 3;
  }

  if (heroX < 0) {
    heroX = canvas.width;
  }
  if (heroX > canvas.width) {
    heroX = 0;
  }
  if (heroY < 0) {
    heroY = canvas.height;
  }
  if (heroY > canvas.height) {
    heroY = 0;
  }

  // Check if player and monster collided. Our images
  // are about 32 pixels big.

  if (
    heroX <= monsterX + 32 &&
    monsterX <= heroX + 32 &&
    heroY <= monsterY + 32 &&
    monsterY <= heroY + 32
  ) {
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    monsterX = Math.round(Math.random() * 500);
    monsterY = Math.round(Math.random() * 400);
    score += 1;
  }
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, heroX, heroY);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monsterX, monsterY);
  }

  if (SECONDS_PER_ROUND - elapsedTime > 0) {
    ctx.fillText(
      `Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`,
      20,
      100
    );

    ctx.fillText(`Your score: ${score}`, 20, 80);
  } else {
    ctx.fillText(`Seconds Remaining: 0`, 20, 100);
    ctx.fillText(`Your score: ${score}`, 20, 80);
    document.getElementById("userScore").innerHTML = score;
    heroX = 0;
    heroY = 0;
    document.getElementById("reset").hidden = false;
  }
};

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.

  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!

setupKeyboardListeners();
loadImages();
main();

function register() {
  let userName = document.getElementById("userInput").value;
  document.getElementById("userInfo").innerHTML = userName;
  // document.getElementById("start").hidden  = false;
}

function resetGame() {
  startTime = Date.now();
  score = 0;
  heroX = canvas.width / 2;
  heroY = canvas.height / 2;
  monsterX = 100;
  monsterY = 100;
  console.log("abc");
  loadImages();
  main();
  setupKeyboardListeners();
}
