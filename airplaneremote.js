var localIP = window.location.href;
if (localIP === "" || localIP === false){
  localIP = window.location.href;
}
/*******************************************/

var interact = function(action){
  //window.location.href=localIP+"/"+action;
  var send = new XMLHttpRequest();
  send.open('GET', localIP+"/"+action,true);
  // send.withCredentials = true;
  // send.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // send.setRequestHeader("Access-Control-Allow-Origin", "*");
  // send.setRequestHeader("Access-Control-Allow-Credentials", true);
  send.send();
};




document.body.style.zoom = "180%";
document.body.addEventListener("zoom", function(){document.body.style.zoom = "500%";});

fill(220,220,0);
rect(20,60,40,100);
rect(80,60,100,100);

noFill();
noStroke();

var title = rect( 20,0,160,30);
title.innerHTML = "<h4 align = 'center'>Airplane Remote</h4>";
var up = rect(110,70,40,20);
up.align = "center";
up.innerHTML = "<button onclick = 'interact(\"UP\");'>&#9650</button>";
var down = rect(110,130,40,20);
down.align = "center";
down.innerHTML = "<button onclick = 'interact(\"DOWN\");'>&#9660</button>";
var left = rect(80,100,40,20);
left.align = "center";
left.innerHTML = "<button onclick = 'interact(\"LEFT\");'>&#9664</button>";
var right = rect(140,100,40,20);
right.align = "center";
right.innerHTML = "<button onclick = 'interact(\"RIGHT\");'>&#9654</button>";
var neutral = rect(110,100,40,20);
neutral.align = "center";
neutral.innerHTML = "<button onclick = 'interact(\"NEUTRAL\");'>&nbsp</button>";

var fast = rect(20,70,40,20);
fast.align = "center";
fast.innerHTML = "<button onclick = 'interact(\"FAST\");'>+</button>";
var slow = rect(20,130,40,20);
slow.align = "center";
slow.innerHTML = "<button onclick = 'interact(\"SLOW\");'>--</button>";

var tilt = rect(20,165,150,20);
tilt.align = "center";
tilt.innerHTML = "<button onclick = 'tilt();'>enable tilt mode</button>";

stroke(0,0,0);
var grid = rect( 20, 190, 160, 100);

/*******************/

var x = [10,0,0,0,0,0,5,8,7,4,3,7];
var y = [7,5,3,-3,6,-1,3,5,3,6,7,7];
var z = [-10,-10,0,0,7,5,3,-1,-3,6,9,10];
var k = 8;
var drawGrid = function(x,y,z,t){
  strokeWeight(0.5);
  stroke(255,0,0);
  line(20 + (t-1)*k, 240 - 2*x[t-1], 20 + t*k, 240 - 2*x[t]);
  stroke(0,255,0);
  line(20 + (t-1)*k, 240 - 2*y[t-1], 20 + t*k, 240 - 2*y[t]);
  stroke(0,0,255);
  line(20 + (t-1)*k, 240 - 2*z[t-1], 20 + t*k, 240 - 2*z[t]);
};
var drawGridF = function(){
  for (var i = 0; i < lines.length; i++){
    lines[i].parentNode.removeChild(lines[i]);
  }
  lines = [];
  k = 160/x.length;
  for (var i = 1; i < x.length*1; i+=1){
    drawGrid(x,y,z,i);
  }
}



var tiltSense = function(){
  // screen.orientation.lock("orientation");
  var deviceOrientationListener = function(e){ 
    gy = round(e.beta);
    gz = round(e.gamma);
    interact("updown="+gy);
    interact("leftright="+gz);
    dbg1.innerHTML = "y:" + gy;
    dbg2.innerHTML = "z:" + gz;
  }
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
  } else {
    alert("Sorry, your browser doesn't support Device Orientation");
  }
};

var tx;
var ty;
var gy;
var gz;
var val;
var dbg0 = rect(0,0,0,0);
var dbg1 = rect(0,20,0,0);
var dbg2 = rect(0,40,0,0);
var tilt = function(){
  document.body.innerHTML = "";
  noFill();
  noStroke();
  rect(130,20,0,0).innerHTML = "100";
  rect(130,220,0,0).innerHTML = "0";
  dbg0 = rect(0,0,0,0);
  dbg1 = rect(0,20,0,0);
  dbg2 = rect(0,40,0,0);
  stroke(0,0,0);
  fill(100,100,100);
  var slidebar = rect(85,20,30,220);
  fill(200,200,200);
  var slider = rect(75,220,50,20);
  slider.style.tranition = ".1s";
  tiltSense();
  slider.addEventListener("touchmove", function(e){
    ty = round((e.touches[0].clientY - 20)*0.5);
    if (ty >= 220){
      ty = 220;
    }
    if (ty <= 20){
      ty = 20;
    }
    
    slider.style.top= ty + "px";
    val = -0.5*ty + 110;
    dbg0.innerHTML = "spd:" + val;
    interact("speed="+val);
  });
}

script.send();