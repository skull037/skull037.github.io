var namespace = "http://www.w3.org/2000/svg"
    //zombies
var rightZedArray = [];
var leftZedArray = [];
var specialZedArray =[];
var lrBool = 0;
//player
var coolDown = 0;
var invul =0;
var player = makeImage("Images/player.png", 200, 90, 25, 25, 1)
document.addEventListener("keydown", playerFunction)
    //B arrays
var bullets = [];
var lastDir = 37;
//score stuff
var score = 0;
var scoreText = makeText(score, 10, 20, 20, "sans-serif", "white");
var healthInt = 3;
var healthText = makeText(healthInt,60, 20, 20, "sans-serif", "red");

function start() {
    for (var i = 0; i < 50; i++) {
        rightZedArray.push(makeImage("Images/Zed.gif", random(400, 600), random(0, 170), random(24, 26), random(24, 26), 1))
        leftZedArray.push(makeImage("Images/leftZed.gif", random(0, -400), random(0, 170), random(24, 26), random(24, 26), 1))
    }
}
start();
update();

function update() {
    if(healthInt>0){
    moveZeds();
    moveBullets();
    bulletCheck();
    if(coolDown > 0){coolDown--;}
    if(invul > 0){invul--;}
    if(healthInt == 0){gameOver()}
    requestAnimationFrame(update);
    }
    }
function zedMaker(){
    if(healthInt > 0){
  if(rightZedArray.length + leftZedArray.length < 20){
    for (var i = 0; i < 40; i++) {
        rightZedArray.push(makeImage("Images/Zed.gif", random(400, 600), random(0, 170), random(24, 26), random(24, 26), 1))
        leftZedArray.push(makeImage("Images/leftZed.gif", random(0, -400), random(0, 170), random(24, 26), random(24, 26), 1))
    }
  }
if(lrBool == 0){
  lrBool = 1
  rightZedArray.push(makeImage("Images/Zed.gif", random(400, 600), random(0, 170), random(24, 26), random(24, 26), 1))
}
else{
  lrBool = 0
          leftZedArray.push(makeImage("Images/leftZed.gif", random(0, -400), random(0, 170), random(24, 26), random(24, 26), 1))
}
  setTimeout(zedMaker,250);
}
}
  setTimeout(zedMaker,250);
function moveZeds() {
    for (var i = 0; i < rightZedArray.length; i++) {
        move(rightZedArray[i], -0.25, 0);
        if (getX(rightZedArray[i]) < 0) {
            setX(rightZedArray[i], 400)
        }
        playerCheckR(player,i);
    }
    for (var i = 0; i < leftZedArray.length; i++) {
        move(leftZedArray[i], 0.25, 0);
        if (getX(leftZedArray[i]) > 400) {
            setX(leftZedArray[i], 0)
        }
                playerCheck(player,i);
    }
}

function playerFunction(event) {
        if(healthInt>0){
    if (event.keyCode == 37 || event.keyCode == 65) {
        move(player, -5, 0)
        lastDir = 37;
    } else if (event.keyCode == 39 || event.keyCode == 68) {
        move(player, 5, 0)
        lastDir = 39;
    } else if (event.keyCode == 40 || event.keyCode == 83) {
        move(player, 0, 5)
        lastDir = 40;
    } else if (event.keyCode == 38 || event.keyCode == 87) {
        move(player, 0, -5)
        lastDir = 38;
    }
    if (event.keyCode == 32 && coolDown < 30) {
      coolDown += 30;
        if (lastDir == 37) {
            bullets.push({
                base: makeRect(getX(player) + 12.5, getY(player) + 10, 5, 5, "white", 1),
                moveY: 0,
                moveX: -5,
                health:3
            })
        } else if (lastDir == 39) {
            bullets.push({
                base: makeRect(getX(player) + 12.5, getY(player) + 10, 5, 5, "white", 1),
                moveY: 0,
                moveX: 5,
                health:3
            })
        } else if (lastDir == 40) {
            bullets.push({
                base: makeRect(getX(player) + 12.5, getY(player) + 10, 5, 5, "white", 1),
                moveY: 5,
                moveX: 0,
                health:3
            })
        } else if (lastDir == 38) {
            bullets.push({
                base: makeRect(getX(player) + 12.5, getY(player) + 10, 5, 5, "white", 1),
                moveY: -5,
                moveX: 0,
                health:3
            })
        }
    }
}
    requestAnimationFrame(playerFunction);
}

function checkCollisionsR(i,zi) {
    if (getX(bullets[i].base) >= getX(rightZedArray[zi]) - 10 && getX(bullets[i].base) <= getX(rightZedArray[zi]) + 10 && getY(bullets[i].base) >= getY(rightZedArray[zi]) - 20 && getY(bullets[i].base) <= getY(rightZedArray[zi]) + 20) {
        score = score + 10;
        scoreText.innerHTML = score;
        setY(rightZedArray[zi],-500);
        rightZedArray.splice(zi, 1);
        bullets[i].health -= 1;
        if(bullets[i].health == 0){
        setY(bullets[i].base,-500);
    }
}
}
function checkCollisionsL(i,zi) {
    if (getX(bullets[i].base) >= getX(leftZedArray[zi]) - 10 && getX(bullets[i].base) <= getX(leftZedArray[zi]) + 10 && getY(bullets[i].base) >= getY(leftZedArray[zi]) - 20 && getY(bullets[i].base) <= getY(leftZedArray[zi]) + 20) {
        score = score + 10;
        scoreText.innerHTML = score;
        setY(leftZedArray[zi],-500);
        leftZedArray.splice(zi, 1);
        setY(bullets[i].base,-500);
        bullets[i].health -=1;
        if(bullets[i].health == 0){
        setY(bullets[i].base,-500);
    }
    }
}
          var Lcheck = 0;
          var Rcheck = 0;
function moveBullets() {
    for (var i = 0; i < bullets.length; i++){
        move(bullets[i].base, bullets[i].moveX, bullets[i].moveY);
        for(var j=0;j<rightZedArray.length;j++){
        checkCollisionsR(i,j);
      }
        for(var j=0;j<leftZedArray.length;j++){
        checkCollisionsL(i,j);
      }
  }
}

function bulletCheck() {
    for (var i = 0; i < bullets.length; i++) {
        if (getX(bullets[i].base) < -50 || getX(bullets[i].base) > 500 || getY(bullets[i].base) < -50 || getY(bullets[i].base) > 200) {
            bullets.splice(i, 1);
        }
    }
}
function playerCheck(player,zi){
    if(invul ==0){
  if (getX(player) >= getX(leftZedArray[zi]) - 15 && getX(player) <= getX(leftZedArray[zi]) + 15 && getY(player) >= getY(leftZedArray[zi]) - 15 && getY(player) <= getY(leftZedArray[zi]) + 15) {
    healthInt = healthInt - 1;
    healthText.innerHTML = healthInt;
    invul = 60;
  }
}
}
function playerCheckR(player,zi){
  if(invul ==0){
  if (getX(player) >= getX(rightZedArray[zi]) - 15 && getX(player) <= getX(rightZedArray[zi]) + 15 && getY(player) >= getY(rightZedArray[zi]) - 15 && getY(player) <= getY(rightZedArray[zi]) + 15) {
    healthInt = healthInt - 1;
    healthText.innerHTML = healthInt;
        invul = 180;
  }
}
}
function gameOver(){
var deadText = makeText("YOU ARE DEAD",125, 90, 20, "sans-serif", "red");
}
//codey stuff
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getX(shape) {
    if (shape.hasAttribute("x")) {
        return parseFloat(shape.getAttribute("x"))
    } else {
        return parseFloat(shape.getAttribute("cx"))
    }
}

function getY(shape) {
    if (shape.hasAttribute("y")) {
        return parseFloat(shape.getAttribute("y"))
    } else {
        return parseFloat(shape.getAttribute("cy"))
    }
}

function setX(shape, x) {
    if (shape.hasAttribute("x")) {
        shape.setAttribute("x", x)
    } else {
        shape.setAttribute("cx", x)
    }
}

function setY(shape, y) {
    if (shape.hasAttribute("y")) {
        shape.setAttribute("y", y)
    } else {
        shape.setAttribute("cy", y)
    }
}

function move(shape, dx, dy) {
    if (shape.hasAttribute("x") && shape.hasAttribute("y")) {
        var x = parseFloat(shape.getAttribute("x"))
        var y = parseFloat(shape.getAttribute("y"))
        shape.setAttribute("x", x + dx)
        shape.setAttribute("y", y + dy)
    } else {
        var cx = parseFloat(shape.getAttribute("cx"))
        var cy = parseFloat(shape.getAttribute("cy"))
        shape.setAttribute("cx", cx + dx)
        shape.setAttribute("cy", cy + dy)
    }
}

function makeCircle(cx, cy, r, fill, opacity) {
    var circle = document.createElementNS(namespace, "circle")
    circle.setAttribute("cx", cx)
    circle.setAttribute("cy", cy)
    circle.setAttribute("r", r)
    circle.setAttribute("fill", fill)
    circle.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(circle)
    return circle
}

function makeRect(x, y, width, height, fill, opacity) {
    var rect = document.createElementNS(namespace, "rect")
    rect.setAttribute("x", x)
    rect.setAttribute("y", y)
    rect.setAttribute("width", width)
    rect.setAttribute("height", height)
    rect.setAttribute("fill", fill)
    rect.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(rect)
    return rect
}

function makeEllipse(cx, cy, rx, ry, fill, opacity) {
    var ellipse = document.createElementNS(namespace, "ellipse")
    ellipse.setAttribute("cx", cx)
    ellipse.setAttribute("cy", cy)
    ellipse.setAttribute("rx", rx)
    ellipse.setAttribute("ry", ry)
    ellipse.setAttribute("fill", fill)
    ellipse.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(ellipse)
    return ellipse
}

function makeLine(x1, y1, x2, y2, stroke, strokeWidth, opacity) {
    var line = document.createElementNS(namespace, "line")
    line.setAttribute("x1", x1)
    line.setAttribute("y1", y1)
    line.setAttribute("x2", x2)
    line.setAttribute("y2", y2)
    line.setAttribute("stroke", stroke)
    line.setAttribute("stroke-width", strokeWidth)
    line.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(line)
    return line
}

function makePolyline(points, stroke, strokeWidth, opacity) {
    var polyline = document.createElementNS(namespace, "polyline")
    polyline.setAttribute("points", points)
    polyline.setAttribute("stroke", stroke)
    polyline.setAttribute("stroke-width", strokeWidth)
    polyline.setAttribute("opacity", opacity)
    polyline.setAttribute("fill", "none")

    var canvas = document.getElementById("canvas")
    canvas.appendChild(polyline)
    return polyline
}

function makePolygon(points, fill, opacity) {
    var polygon = document.createElementNS(namespace, "polygon")
    polygon.setAttribute("points", points)
    polygon.setAttribute("opacity", opacity)
    polygon.setAttribute("fill", fill)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(polygon)
    return polygon
}

function makeText(message, x, y, fontSize, fontFamily, fill, opacity) {
    var text = document.createElementNS(namespace, "text")
    text.innerHTML = message
    text.setAttribute("x", x)
    text.setAttribute("y", y)
    text.setAttribute("font-size", fontSize)
    text.setAttribute("font-family", fontFamily)
    text.setAttribute("fill", fill)
    text.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(text)
    return text
}

function makeImage(url, x, y, width, height, opacity) {
    var image = document.createElementNS(namespace, "image")
    image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", url)
    image.setAttribute("x", x)
    image.setAttribute("y", y)
    image.setAttribute("width", width)
    image.setAttribute("height", height)
    image.setAttribute("opacity", opacity)

    var canvas = document.getElementById("canvas")
    canvas.appendChild(image)
    return image
}
