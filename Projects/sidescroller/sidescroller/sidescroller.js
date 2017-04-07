var namespace = "http://www.w3.org/2000/svg"

var player = makeImage("images/player.png", 130, 80, 30, 30)
var fish = []
var rectangles = [makeRect(20, 0, 15, 100, "#333333"),
                  makeRect(100, 200, 15, 220, "#333333"),
                  makeRect(210, 0, 15, 90, "#333333"),
                  makeRect(290, 180, 15, 140, "#333333"),
                  makeRect(350, 0, 15, 70, "#333333"),
                  makeRect(460, 210, 15, 230, "#333333"),
                  makeRect(570, 0, 15, 80, "#333333")
                ]

var sharks = [
  makeImage("images/shark.png", 350, 80, 60, 60),
  makeImage("images/shark.png", 450, 180, 60, 60),
  makeImage("images/shark.png", 780, 20, 60, 60)
  ]

gameOver = false

// YOUR CODE GOES HERE
function moveplayer(){
  if(getY(player)>300||getY(player)<0||getX(player)<0||getX(player)>600){
    gameOver = true
    gameOverDisplay()
  }
}
function moveSharks(){
  for(var i =0;i<sharks.length;i++){
    if(getX(sharks[i])>-60){
      move(sharks[i],-2,0);
    }
    else{
      setX(sharks[i],random(600,700))
      setY(sharks[i],random(20,250))
    }
  }
}
function moveRectangles(){
for(var i=0;i<rectangles.length;i++){
  if(getX(rectangles[i])>-15){
    move(rectangles[i],-1,0)
  }
  else{
        setX(rectangles[i],600);
    if(i % 2){
    setY(rectangles[i],random(100,260));
  }
else{
  setY(rectangles[i],random(-20,0));
  }
}
}
}
function moveFish(){
for(var i=0;i<fish.length;i++){
if(getX(fish[i].base)>-20){
  move(fish[i].base,(fish[i].move),0)
}
else{
  setX(fish[i].base,620)
}
}
}
function moveEverything(){
  moveplayer();
  moveSharks();
  moveRectangles();
  moveFish();
  checkCollisionsRectangles();
  checkCollisionsSharks();
  checkCollisionsFish();
  if(gameOver==false){
    requestAnimationFrame(moveEverything);
  }
}
function flap(event){
  if(gameOver == false){
if(event.keyCode == 40 || event.keyCode == 83){
  move(player,0,20);
}else if(event.keyCode == 38 || event.keyCode == 87){
  move(player,0,-20);
}else if (event.keyCode == 37 || event.keyCode == 65) {
        move(player, -20, 0)
} else if (event.keyCode == 39 || event.keyCode == 68) {
        move(player, 20, 0)
    }
  }
  else{
    location.reload();
  }
}
document.addEventListener("keydown",flap)
function timeIncrease(){
  if(gameOver == false){
    timer++;
    timerText.innerHTML = timer;
  }
setTimeout(timeIncrease,1000)
}
setTimeout(timeIncrease,1000)
function addFish() {
  for (var i = 0; i < numOfFish; i++) {
    fish.push({base:
      makeImage("images/fish.png", random(0, 600), random(20, 250), 30, 30),
      points:1,
      move:random(-0,-4)})
  }
}
function addSuperthing() {
  for (var i = 0; i < 3; i++) {
    fish.push({base:
      makeImage("images/Superthing.png", random(0, 600), random(20, 250), 30, 30),
      points:5,
      move:random(-1,-5)})
  }
}
function checkCollisionsRectangles() {
  for (var i = 0; i < rectangles.length; i++) {
    if (!(getX(rectangles[i]) > getX(player) + Number(player.getAttribute("width")-5)
        || getX(rectangles[i]) + Number(rectangles[i].getAttribute("width")) < getX(player)
        || getY(rectangles[i]) > getY(player) + Number(player.getAttribute("height")-5)
        || getY(rectangles[i]) + Number(rectangles[i].getAttribute("height")) < getY(player))) {
      //console.log(i)
      gameOver = true
      gameOverDisplay()
    }
  }
}

function checkCollisionsSharks() {
  for (var i = 0; i < sharks.length; i++) {
    if (!(getX(sharks[i]) > getX(player) + Number(player.getAttribute("width")-2)/2
        || getX(sharks[i]) + Number(sharks[i].getAttribute("width")) < getX(player)+20
        || getY(sharks[i])+10 > getY(player) + Number(player.getAttribute("height")-2)/2
        || getY(sharks[i]) + Number(sharks[i].getAttribute("height"))-10 < getY(player))) {
      gameOver = true
      gameOverDisplay()
    }
  }
}

function checkCollisionsFish() {
  for (var i = 0; i < fish.length; i++) {
    if (!(getX(fish[i].base) > getX(player) + Number(player.getAttribute("width"))/2
        || getX(fish[i].base) + Number(fish[i].base.getAttribute("width")) < getX(player)
        || getY(fish[i].base) > getY(player) + Number(player.getAttribute("height"))/2
        || getY(fish[i].base) + Number(fish[i].base.getAttribute("height"))/2 < getY(player))) {
      score = score + fish[i].points
      scoreText.innerHTML = score
      if (fish[i].base.parentNode) {
          fish[i].base.parentNode.removeChild(fish[i].base)
        }
      if(fish[i].points == 5){
        fish.push({base:
          makeImage("images/Superthing.png", random(0, 600), random(20, 250), 30, 30),
          points:5,
          move:random(-1,-5)
        })
      }
      else{
      fish.push({base:
        makeImage("images/fish.png", random(0, 600), random(20, 250), 30, 30),
        points:1,
        move:random(-1,-4)
      })
    }
          fish.splice(i, 1)
  }
  }
}

function gameOverDisplay() {
  makeText("GAME OVER", 220, 150, 48, "VT323", "white", 1)
    makeText("PRESS ANY KEY TO RESTART", 100, 250, 48, "VT323", "white", 1)
}
// GAME INITIALIZATION
addFish()
addSuperthing()
moveEverything();
