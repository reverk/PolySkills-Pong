// Disables checking (for VS Code)
// @ts-nocheck

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Paddle & Ball image import
var ball = document.createElement("img");
ball.src = "Images/Ball.png";

var paddleImg = document.createElement("img");
paddleImg.src = "Images/Paddle.png";

// Dimentions of Ball
var ballSize = 25;

// Dimentions of paddle
var paddleHeight = 10;
var paddleWidth = 100;

// Initial ball position
var x = canvas.width / 2;
var y = canvas.height - 30;

// Initial ball direction
var dx = 5;
var dy = -5;

// Initial paddle position
var paddleX = (canvas.width - paddleWidth) / 2;

// Player stats
var score = 0;
var lives = 3;
var time = 0;

// Audio file (as variable)
var audio = new Audio("bounce.wav");

// Wall width = 30px
// Casues 'premature' bumping
var WallWidth = 30;

// Monitors for any mouse movements
// This is for paddle movement
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Creates a ball
function drawBall() {
  ctx.beginPath();
  ctx.drawImage(ball, x, y);
  ctx.closePath();
}

// Creates a paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.drawImage(paddleImg, paddleX, canvas.height - 15);
  ctx.closePath();
}

// User stats (static)
document.getElementById("score").innerHTML = score;
document.getElementById("lives").innerHTML = lives;
document.getElementById("timer").innerHTML = time;

// Restart -- used for restart button
function restart() {
  document.location.reload();
  clearInterval(interval); // Needed for Chrome to end game
}
// End of stats

// Checks for border hits, including the paddle
function collisionDetection() {
  // Checks for left & right border respectively
  if (x + dx > canvas.width - ballSize - WallWidth || x + dx < WallWidth) {
    dx = -dx;
    audio.play();
  }

  // Checks for top border
  if (y + dy < WallWidth) {
    dy = -dy;
    audio.play();
  } 
  // Checks for bottom border
  else if (y + dy > canvas.height - ballSize) {
    // If it hits the paddle:
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      audio.play();
      score++;
    } 
    // Otherwise, if it actually hits the bottom border
    else {
      // User loses one live
      lives--;

      // If there's no more lives
      if (lives == 0) {
        alert("Game Over!");
        var name = prompt("Please enter your name ", "Name");
        restart();
      } 
      // Otherwise it will go back to initial stats
      else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 5;
        dy = -5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
}

// The main function to run the game
function draw() {
  
  // IMPORTANT: Clears previous 'drawing'
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawBall();
  drawPaddle();
  
  document.getElementById("score").innerHTML = score;
  document.getElementById("lives").innerHTML = lives;
  document.getElementById("timer").innerHTML = time;
  
  collisionDetection();

  // Ball movement
  x += dx;
  y += dy;
}

// Runs when user clicks on it
function run() {
  // Hides the button until it restarts
  document.getElementById("startBtn").style.display = 'none';

  var interval = setInterval(draw, 30);
  
  // Timer +1 seconds
  var timer = setInterval(function() { time++; }, 1000);
}