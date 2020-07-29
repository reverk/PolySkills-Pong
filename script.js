// Disables checking for VSCode (usually false positives)
// @ts-nocheck

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Ball & Paddle image import
var ball = document.createElement("img");
ball.src = "Images/Ball.png";
var paddle = document.createElement("img");
paddle.src = "Images/Paddle.png"; 

// Ball & Paddle dimentions
var ballSize = 25;
var paddleWidth = 100;

// Wall's width
var wallWidth = 30;

// User stats value
var score = 0;
var lives = 3;
var time = 0;

// Initial ball position
var x = canvas.width / 2;
var y =  canvas.height - 45;

// Initial ball position
var dx = 5;
var dy = -5;

// Countdown timer
var count = 3;
// Countdown function (globally declared)
var counter;

// Initial paddle position
var paddleX = ((canvas.width - paddleWidth) / 2)

// Audio file for voice
var audio = new Audio("bounce.wav");

// Static user stats
document.getElementById("score").innerHTML = score;
document.getElementById("health").innerHTML = lives;
document.getElementById("time").innerHTML = time;

// Monitors for mouse movements
document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2
    }
}

// Ball drawing
function drawBall() {
    ctx.beginPath();
    ctx.drawImage(ball, x, y);
    ctx.closePath();
}

// Paddle drawing
function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(paddle, paddleX, canvas.height - 15);
    ctx.closePath();
}

// Restart page
function restart() {
    document.location.reload();
    clearInterval(interval);
}

// Checks for border hits
function colDetection() {
    // If it hits L or R
    if (x + dx < wallWidth || x + dx > canvas.width - wallWidth - ballSize) {
        dx = -dx;
        audio.play();
    }

    // If it hits the top
    if (y + dy < wallWidth) {
        dy = -dy;
        audio.play();
    }
    // If it hits the bottom 
    if (y + dy > canvas.height - ballSize) {
        // But it hits the paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            score++;
            audio.play();
            dy = -dy;
        }
        // If it doesen't hit the paddle
        else {
            // They lose 1 live
            lives--;
            // If player has no more lives
            if (lives == 0) {
                alert("Game Over!");
                var name = prompt("Please enter your name", "Name");
                restart();
            }
            // Reset to initial stats
            else {
                x = canvas.width / 2;
                y = canvas.height - 45;
                dy = -5;
                dx = 5;
                paddleX = ((canvas.width - paddleWidth) / 2);
            }
        }
    }
}

// Main Function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    colDetection();

    // Dynamic user stats
    document.getElementById("score").innerHTML = score;
    document.getElementById("health").innerHTML = lives;
    document.getElementById("time").innerHTML = time;

    y += dy;
    x += dx;
}

// Timer before the game starts
function countdownTimer() {
    document.getElementById("countdown").style.display = "block";

    document.getElementById("countdown").innerHTML = count;

    count--;

    if (count == -1) {
        clearInterval(counter);

        document.getElementById("countdown").style.display = "none";

        startGame();
    }    
}

// Starts the game by hiding the button, then starts counting down
function run() {
    document.getElementById("startButton").style.display = "none";

    counter = setInterval(countdownTimer, 1000);

}

function startGame () {
    var startGame = setInterval(draw, 30);

    var clock = setInterval(function() { time++ }, 1000);
}