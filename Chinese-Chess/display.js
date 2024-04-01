/********* board *********/
background(200,200,20);
strokeWeight(4);
fill(180,150,80);
rect(0,0,400,500);
rect(38,58,316,358);

/********* lines *********/
strokeWeight(2);
for(var i = 0; i < 8; i++){
  line(40 + i*40, 60, 40 + i*40, 423);
  line(40, 100 + i*40, 362, 100 + i*40);
}
line(160,60,240,140);
line(160,140,240,60);
line(160,340,240,420);
line(160,420,240,340);
strokeWeight(4);
var river = rect(38,218,316,36);
river.align = "center";
river.style.fontFamily = "標楷體";
river.innerHTML = "楚河 漢界";

/********* judge *********/

var judgeString = "";
noFill();
noStroke();
var judgeEl = rect(38, 10, 318, 20);
judgeEl.align = "center";
judgeEl.style.fontFamily = "標楷體";
judgeEl.innerHTML = judgeString;
var judge = function(text){
  judgeString = text;
  judgeEl.innerHTML = judgeString;
};

/********* thinking *********/

var thinkingEl = rect(272, 15, 90, 15); 
var thinking = 0;
var thinkingF = function(percentage = 0){
  percentage = percentage;
  if (percentage !== 0){
    thinkingEl.innerHTML = "thinking..." + percentage + "%";
  } else {
    thinkingEl.innerHTML = "";
  }
  
};
thinkingF();
thinkingEl.style.fontSize = "50%";
thinkingEl.align = "center";

/********* level *********/

fill(200,200,200);
var level = 1;
var levelArray = [
  "computer3",
  "computer2",
  "computer1",
  "two player"
];
var changeLevel = function(){
  level++;
  if (level === 1){
    depthLimit = 2;
  }
  if (level === 2){
    depthLimit = 3;
  }
  if (level === 3){
    depthLimit = 4;
  }
  if (level > 3){
    level -= 4;
  }
  levelButton.style.transform = "scale(0.9)";
  levelText = levelArray[level];
  levelButton.innerHTML = "level:" + levelText;
};
var levelText = levelArray[level];
var levelButton = rect(38, 15, 90, 15);
levelButton.align = "center";
levelButton.style.fontSize = "50%";
levelButton.innerHTML = "level:" + levelText;
levelButton.style.cursor = "pointer";
levelButton.style.transitionDuration = "0.2s";
levelButton.style.transform = "scale(1)";
levelButton.addEventListener("mousedown", changeLevel);
levelButton.addEventListener("mouseup", function(){levelButton.style.transform = "scale(1)";});


/********* grid *********/
var positionList = [];
for(var i = 0; i < 90; i++){
  positionList.push(i);
}
var gridX = function(pos){
  return (pos%9)*40 + 40;
};
var gridY = function(pos){
  return floor(pos/9)*40 + 60;
};

/********* pieces *********/
fill(255,255,150);
stroke(0,0,0);
strokeWeight(1);

var hoverPiece = function(){
  this.style.cursor = "pointer";
};

var redClicked;
var blackClicked;

var redId = ["K1","A1","A2","E1","E2","H1","H2","R1","R2","C1","C2","P1","P2","P3","P4","P5"];
var redName = ["帥","仕","仕","相","相","傌","傌","俥","俥","炮","炮","兵","兵","兵","兵","兵"];
var redStartPos = [85,84,86,83,87,82,88,81,89,64,70,54,56,58,60,62];
var redEl = [];
var redMoved = [];

var redAction;
var clickRed = function(){
  redClicked = this;
  for(var i = 0; i < blackEl.length; i++){
    size(blackEl[i], 1);  
  }
  for(var i = 0; i < redEl.length; i++){
    size(redEl[i], 1);  
  }
  clearDots();
  size(redClicked, 1.2);
  if (turns === "red"){
    redAction();
  }
};

for (var i = 0; i < redId.length; i++){
  var el = ellipse(gridX(redStartPos[i]), gridY(redStartPos[i]), 31, 31);
  el.innerHTML = redName[i];
  el.align = "center";
  el.style.fontFamily = "標楷體";
  el.style.color = "red";
  el.style.zIndex = "1";
  el.style.transitionDuration = "0.2s";
  el.addEventListener("mouseover", hoverPiece);
  el.addEventListener("click", clickRed);
  redEl.push(el);
  redMoved.push(0);
}


var blackId = ["k1","a1","a2","e1","e2","h1","h2","r1","r2","c1","c2","p1","p2","p3","p4","p5"];
var blackName = ["將","士","士","象","象","馬","馬","車","車","包","包","卒","卒","卒","卒","卒"];
var blackStartPos = [4,3,5,2,6,1,7,0,8,19,25,27,29,31,33,35];
var blackEl = [];
var blackMoved = [];

var blackAction;
var clickBlack = function(){
  blackClicked = this;
  for(var i = 0; i < blackEl.length; i++){
    size(blackEl[i], 1);  
  }
  for(var i = 0; i < redEl.length; i++){
    size(redEl[i], 1);  
  }
  clearDots();
  size(blackClicked, 1.2);
  if (turns === "black"){
    blackAction();
  }
};

for (var i = 0; i < blackId.length; i++){
  var el = ellipse(gridX(blackStartPos[i]), gridY(blackStartPos[i]), 31, 31);
  el.innerHTML = blackName[i];
  el.align = "center";
  el.style.fontFamily = "標楷體";
  el.style.color = "black";
  el.style.zIndex = "1";
  el.style.transitionDuration = "0.2s";
  el.addEventListener("mouseover", hoverPiece);
  el.addEventListener("click", clickBlack);
  blackEl.push(el);
  blackMoved.push(0);
}

var moveRed = function(index,pos){
  piecePos[piecePos.indexOf(redId[index])] = null;
  moveTo(redEl[index], gridX(pos), gridY(pos), 0.4);
  redMoved[index]++;
  size(redEl[index],1);
  clearDots();
  if (blackId.includes(piecePos[pos])){
    blackDie(piecePos[pos]);
  }
  if (dieBoolean !== true){
    piecePos[pos] = redId[index];
    changePlayer();
  } else {
    if (index === 0){
      judge("黑方獲勝！");
      finishBoolean = true;
      //throw new Error("黑方獲勝！");
    }
  }
  
};
var moveBlack = function(index,pos){
  piecePos[piecePos.indexOf(blackId[index])] = null;
  moveTo(blackEl[index], gridX(pos), gridY(pos), 0.4);
  blackMoved[index]++;
  size(blackEl[index],1);
  clearDots();
  
  if (redId.includes(piecePos[pos])){
    
    redDie(piecePos[pos]);
  }
  if (dieBoolean !== true){
    piecePos[pos] = blackId[index];
    changePlayer();
  } else {
    if (index === 0){
      judge("紅方獲勝！");
      finishBoolean = true;
      //throw new Error("紅方獲勝！");
    }
  }
  
};

/********* dots *********/
var dots = [];
var dotPos = [];
var nowClicked;
var dotAction;
var clearDots = function(){
  for (var i = 0; i < dots.length; i++){
    dots[i].parentNode.removeChild(dots[i]);
  }
  dots = [];
  dotPos = [];
  nowClicked = null;
};
var hideDots = function(){
  for (var i = 0; i < dots.length; i++){
    dots[i].style.opacity = "0";
  }
};
var clickDot = function(){
  nowClicked = this;
  dotAction();
};
var createDot = function(pos){
  if (pos >=0 && pos <= 89){
    stroke(255,0,0);
    strokeWeight(15);
    var el = point(gridX(pos), gridY(pos));
    el.style.zIndex = "400";
    el.addEventListener("click", clickDot);
    dotPos.push(pos);
    dots.push(el);
  }
};

/********* grid *********/
var piecePos = [];
for (var i = 0; i < 90; i++){
  piecePos.push(null);
}
for (var i = 0; i < redStartPos.length; i++){
  piecePos[redStartPos[i]] = redId[i];
}
for (var i = 0; i < blackStartPos.length; i++){
  piecePos[blackStartPos[i]] = blackId[i];
}

