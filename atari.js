'use strict';

const width = 40;
const height = 10;
const canvasWidth = 600;
const canvasHeight = 300;
const brickInitHeight = 50;
const ballSize = 10;

strokeWeight(3);
fill(0,0,0);
let canvas = rect(0,0,canvasWidth,canvasHeight);

let grid = [];

// random color
function randomColor() {
  return [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
}

// initialize the game grid
function initGrid() {
  stroke(0,0,0);
  strokeWeight(3);
  for (let x = 0; x < canvasWidth/width; x++){
    grid[x] = [];
    for (let y = 0; y < brickInitHeight/height; y++){
      fill(...randomColor());
      grid[x][y] = rect(x*width, y*height, width, height-3);
    }
  }
}

// initialize pad
fill(255,255,255);
noStroke();
let pad = rect(canvasWidth/2-width/2, canvasHeight-height-10, width, height);

function movePad(key){
  if (key === "ArrowLeft") {
    pad.style.left = parseInt(pad.style.left) - 5 + "px";
  }
  if (key === "ArrowRight") {
    pad.style.left = parseInt(pad.style.left) + 5 + "px";
  }
}

// ball
fill(100,200,255);
noStroke();
let ball = ellipse(canvasWidth/2, canvasHeight/2, ballSize, ballSize);
ball.x = canvasWidth/2;
ball.y = canvasHeight/2;
ball.vx = -1;
ball.vy = -1;
function setBallPos(x, y){
  ball.style.left = x + "px";
  ball.style.top = y + "px";
}

function moveBall(){
  ball.x = ball.x + ball.vx;
  ball.y = ball.y + ball.vy;
  setBallPos(ball.x, ball.y);
  if (ball.x < ballSize || ball.x > canvasWidth-ballSize) {
    ball.vx = -ball.vx;
  }
  if (ball.y < ballSize) {
    ball.vy = -ball.vy;
  }
  if (ball.y < brickInitSize + ballSize) {
    if (grid[Math.floor(ball.x/width)][Math.floor((ball.y-ballSize/2))/height)] !== undefined){
      document.body.removeChild(grid[Math.floor(ball.x/width)][Math.floor((ball.y-ballSize/2)/height)]);
      grid[Math.floor(ball.x/width)][Math.floor((ball.y-ballSize/2)/height)] = undefined;
      ball.vy = -ball.vy;
    }
}

// game
initGrid();

window.addEventListener("keydown", (e) => {
  movePad(e.key);
});

draw = function(){
  moveBall();
}