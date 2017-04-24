var mouse = {x: 0, y: 0}

var station = makeImage("images/spaceStation.png",100,100,50,50);
var score = 0;
var scoreText = makeText("Score: 0", 640, 50, 25, "VT323", "white", 1)
var stationHealth = 3;
var stationHealthText = makeText("Station Health: 3", 600, 75, 25, "VT323", "white", 1)
var player = makeImage("images/spaceship.png",0,0,50,50);
var enemies =[];
var missiles =[];
var eliteEnemies =[];
var gameOver = false;

function drawPlayer(){
  if(mouse.x>0&&mouse.y>0&&mouse.x<750&&mouse.y<350){
  setX(player,mouse.x);
  setY(player,mouse.y);
}
}
function drawEveything(){
  if(stationHealth < 1){
    removeElement(station);
    drawFinalExplosion(100,100);
    gameOver = true;
  }
  if(gameOver == false){
drawPlayer();
drawEnemies();
drawEliteEnemies()
drawMissiles();
checkCollisionsPlayer();
checkCollisionsMissiles();
checkCollisionsMissilesElites();
checkCollisionsPlayerElites();
requestAnimationFrame(drawEveything);
if(enemies.length<2){
  makeEnemies();
}if(eliteEnemies.length<1){
  makeEliteEnemies();
}
}
else{
  makeText("GAME OVER","37.5%", 150, 48, "VT323", "white", 1)
    makeText("Control + R to restart", "22.5%", 200, 48, "VT323", "white", 1)
}
}
function makeEnemies(){
  if(gameOver == false){
  var enemy = makeImage("images/enemy.png",900,random(350,0),50,50)
  enemies.push(enemy);
setTimeout(makeEnemies,1000)
}
}
function makeEliteEnemies(){
  if(gameOver == false){
    var enemy = makeImage("images/Eliteenemy.png",900,random(350,0),50,50)
    eliteEnemies.push(enemy);
  setTimeout(makeEliteEnemies,3000)
  }
}
function fireMissile(){
  if(gameOver == false){
  var rect = makeRect(getX(player)+40,getY(player)+25,10,5,"cyan");
  missiles.push(rect);
}
}
document.addEventListener("click",fireMissile);
function drawMissiles(){
  for(var i=0;i<missiles.length;i++){
    move(missiles[i],5,0);
    if(getX(missiles[i])>800){
      removeArrayElement(missiles,i);
    }
  }
}
setTimeout(makeEnemies,1000)
setTimeout(makeEliteEnemies,1000)
function drawEnemies(){
  for(var i=0;i<enemies.length;i++){
    move(enemies[i],-1,0)
    if(getX(enemies[i])< -50){
      setX(enemies[i],900);
      stationHealth -= 1;
      stationHealthText.innerHTML = "Station Health: " + stationHealth;
      if(stationHealth == 2){
      station.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/spaceStation1.png");
    }
    else if(stationHealth ==1){
      station.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/spaceStation2.png");
    }
    }
  }
}
function drawEliteEnemies(){
  for(var i=0;i<eliteEnemies.length;i++){
    if(getY(player)>getY(eliteEnemies[i])||getY(eliteEnemies[i])>400){
    move(eliteEnemies[i],-2,1)
  }else{
    move(eliteEnemies[i],-2,-1)
  }
    if(getX(eliteEnemies[i])< -50){
      setX(eliteEnemies[i],900);
      stationHealth -= 1;
      stationHealthText.innerHTML = "Station Health: " + stationHealth;
      if(stationHealth == 2){
      station.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/spaceStation1.png");
    }
    else if(stationHealth ==1){
      station.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "images/spaceStation2.png");
    }
    }
  }
}
function checkCollisionsPlayer() {
for(var i=0;i<enemies.length;i++){
  if(collide(player,enemies[i])== true){
    removeArrayElement(enemies,i);
    gameOver = true;
  }
}
}

function checkCollisionsPlayerElites() {
for(var i=0;i<eliteEnemies.length;i++){
  if(collide(player,eliteEnemies[i])== true){
    removeArrayElement(eliteEnemies,i);
    gameOver = true;
  }
}
}
function checkCollisionsMissiles() {
    for (var j = 0; j < enemies.length; j++) {
        for (var i = 0; i < missiles.length; i++) {
          if (collide(missiles[i], enemies[j], 0, -20) == true) {
                drawExplosion(getX(enemies[j]),getY(enemies[j]));
                removeArrayElement(missiles,i);
                removeArrayElement(enemies,j);
                score++;
                scoreText.innerHTML = "Score: "+ score;
              }
        }
    }
}
function checkCollisionsMissilesElites() {
    for (var j = 0; j < eliteEnemies.length; j++) {
        for (var i = 0; i < missiles.length; i++) {
          if (collide(missiles[i], eliteEnemies[j], 0, -20) == true) {
                drawExplosion(getX(eliteEnemies[j]),getY(eliteEnemies[j]));
                removeArrayElement(missiles,i);
                removeArrayElement(eliteEnemies,j);
                score++;
                scoreText.innerHTML = "Score: "+ score;
              }
        }
    }
}
drawEveything();
