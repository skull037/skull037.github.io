//>'д'<\\
var socket = io();
var shots = [];
var zeds = [];
var diffOffset = 0;
var shotTimer = 0;
var playersNum;
var myFont;
var localShots = 0;
var doneConnecting = false;
var isUpgradeSetUp = false;
var localWave = false;
var invulFrames = 30;
var playersArray = [];
var localTime = 0;
var restartTimer = 5;
var nonHostResetTimer = 20;
var gameOver = false;
var dead = false;
var localWaveInProgress = true;
var waveNum;
var upgradeButtons = [];
var canvasMargin;
function preload() {
    myFont = loadFont('cubic.ttf');
    heartImg = loadImage("Heart.png");
}

function setup() {
    createCanvas(800, 600)
    canvasMargin = document.getElementById('defaultCanvas0').style.marginLeft
    background(0, 120, 120)
    frameRate(60)
}
socket.on('join', function(playerServer, serverWave) {
    if (doneConnecting == false) {
        playersArray = playerServer
        playersNum = playersArray.length - 1
        doneConnecting = true
        waveNum = serverWave
    }
})

function draw() {
    if (gameOver == false && dead == false) {
        if (keyIsDown(87)) {
            playersArray[playersNum].y -= playersArray[playersNum].speed
        }
        if (keyIsDown(83)) {
            playersArray[playersNum].y += playersArray[playersNum].speed
        }
        if (keyIsDown(65)) {
            playersArray[playersNum].x -= playersArray[playersNum].speed
        }
        if (keyIsDown(68)) {
            playersArray[playersNum].x += playersArray[playersNum].speed
        }
        socket.emit('updateplayer', playersNum, playersArray);
        if (keyIsDown(38) & shotTimer <= 0) {
            //shootup
            shoot("up")
            shotTimer = playersArray[playersNum].shotTimer;
            localShots++
        }
        if (keyIsDown(37) & shotTimer <= 0) {
            //left
            shoot("left")
            shotTimer = playersArray[playersNum].shotTimer;
            localShots++
        }
        if (keyIsDown(39) & shotTimer <= 0) {
            //right
            shoot("right")
            shotTimer = playersArray[playersNum].shotTimer;
            localShots++
        }
        if (keyIsDown(40) & shotTimer <= 0) {
            //down
            shoot("down")
            shotTimer = playersArray[playersNum].shotTimer;
            localShots++
        }
        clear()
        fill(0, 128 - (localTime / 100), 0)
        rect(0, 0, 1000, 1000);
        for (var p = 0; p < playersArray.length; p++) {
            if (p == 0) {
                fill('purple')
            } else {
                fill(0, (150 + p * 25), (150 + p * 25))
            }
            rect(playersArray[p].x, playersArray[p].y, 25, 25);
        }
        if (shotTimer > 0) {
            shotTimer--
        }if (invulFrames > 0) {
            invulFrames--
        }
        for (var i = 0; i < shots.length; i++) {
            if (shots[i].dir == "up") {
                shots[i].shotY -= playersArray[playersNum].shotSpeed
            } else if (shots[i].dir == "left") {
                shots[i].shotX -= playersArray[playersNum].shotSpeed
            } else if (shots[i].dir == "right") {
                shots[i].shotX += playersArray[playersNum].shotSpeed
            } else if (shots[i].dir == "down") {
                shots[i].shotY += playersArray[playersNum].shotSpeed
            }
            if (shots[i].shotX > 0 && shots[i].shotX < 800 && shots[i].shotY > 0 && shots[i].shotY < 600) {
                fill("white")
                rect(shots[i].shotX, shots[i].shotY, 5, 5);
            }
        }
        //moving zombies
        if (playersNum == 0 && localWaveInProgress == true) {
            var speed = 1;
            for (var j = 0; j < zeds.length; j++) {
                if (zeds[j].type == "fast") {
                    speed = 3 + Math.random()
                } else {
                    speed = 1 //+ (waveNum/10)
                }
                var close = []
                if (zeds[j].x > playersArray[playersNum].x) {
                    zeds[j].x -= speed
                } else {
                    zeds[j].x += speed
                }
                if (zeds[j].y > playersArray[playersNum].y) {
                    zeds[j].y -= speed
                } else {
                    zeds[j].y += speed
                }
                socket.emit('zedUpdate', zeds)
                fill(zeds[j].color)
                rect(zeds[j].x, zeds[j].y, 20, 20)
            }
        } else if (playersNum != 0) {
            for (var j = 0; j < zeds.length; j++) {
                fill(zeds[j].color)
                rect(zeds[j].x, zeds[j].y, 20, 20)
            }
        }
        checkCol()
        drawHud()
    }
}

function shoot(dir) {
    shotX = (playersArray[playersNum].x + 12)
    shotY = (playersArray[playersNum].y + 12)
    shots.push({
        shotX: shotX,
        shotY: shotY,
        dir: dir,
        shotPen: playersArray[playersNum].shotPen
    })
    socket.emit('updateShots', shots)
}

function checkCol() {
    for (var s = 0; s < shots.length; s++) {
        for (var z = 0; z < zeds.length; z++) {
          //bullets
            if (shots[s].shotX > zeds[z].x - 20 && shots[s].shotX < zeds[z].x + 20 && shots[s].shotY > zeds[z].y - 20 && shots[s].shotY < zeds[z].y + 20) {
                shots[s].shotPen--
                    removeArrayElement(zeds, z)
                if (shots[s].shotPen <= 0) {
                    removeArrayElement(shots, s)
                }
                playersArray[0].kills++;
                socket.emit('updateplayer', playersNum, playersArray);
                socket.emit('bullCollide', shots, zeds)
                return
            }
            //players
            if (playersArray[playersNum].x > zeds[z].x - 20 && playersArray[playersNum].x < zeds[z].x + 20 && playersArray[playersNum].y > zeds[z].y - 20 && playersArray[playersNum].y < zeds[z].y + 20 &&invulFrames == 0) {
                playersArray[playersNum].health -= 1
                invulFrames = 30;
                socket.emit('updateplayer', playersNum, playersArray);
                if (playersNum != 0 && playersArray[playersNum].health == 0) {
                    dead = true;
                    return
                } else if (playersNum == 0 && playersArray[playersNum].health == 0) {
                    socket.emit('gameOver')
                    return
                }
            }
        }
    }
}
socket.on('update', function(pArray, sArray, zArray, kInt) {
    if (pArray != "") {
        playersArray = pArray
    }
    if (zArray != "") {
        zeds = zArray
    }
    if (sArray != "") {
        shots = sArray
    }
})
function removeArrayElement(array, index) {
    var element = array[index]
    if (array.length == 1) {
        array.length = 0;
    }
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
    array.splice(index, 1)
}

function drawHud() {
    fill("black")
    rect(0, 0, 800, 100)
    textFont(myFont)
    textSize(16);
    fill("cyan")
    if (playersNum == 0) {
        text('You are Host, Survive As Long As Possile', 0, 16);
    } else {
        text('You are a Helper, help Host survive As Long As Possile', 0, 16);
    }
    if (localWaveInProgress == true) {
        text('Time left in wave: ' + (30 * waveNum - localTime), 0, 32);
    } else {
        text('Time left until next wave: ' + (30 * waveNum - localTime + 10), 0, 32);
    }
    text('Kills: ' + playersArray[0].kills, 600, 16);
    text('Time Survived: ' + localTime, 600, 32);
    if (localWaveInProgress == false) {
        fill('rgba(0,0,0, .5)');
        rect(0, 100, 800, 500)
        setupUpgradeButtons();
    }
    if (playersArray[playersNum].health != 1) {
        for (var h = 0; h < playersArray[playersNum].health - 1; h++) {
            image(heartImg, 40 * h, 65)
        }
    }
}

socket.on('updateTime', function(serverTime) {
    localTime = serverTime;
});
socket.on('gameOver', function() {
    gameOver = true
    fill("black")
    rect(0, 0, 800, 600)
    fill("red")
    textSize(64);
    text('Host is dead', 232, 300);
    text('Restarting in ' + restartTimer, 168, 428);
})
socket.on('updateEndCounter', function(serverTimer) {
    restartTimer = serverTimer;
})
socket.on('end', function(serverTimer) {
    console.log('reset')
})

setInterval(function() {
    if (gameOver == true) {
        restartTimer--
        clear()
        fill("black")
        rect(0, 0, 800, 600)
        fill("red")
        textSize(64);
        text('Host is dead', 232, 300);
        text('Restarting in ' + restartTimer, 168, 428);
    }
    if (dead == true && gameOver == false) {
        nonHostResetTimer--
        clear()
        fill("black")
        rect(0, 0, 800, 600)
        fill("red")
        textSize(64);
        text('You are dead', 232, 300);
        text('Respawning in ' + nonHostResetTimer, 168, 428);
        playersArray[playersNum].x = 2000
        playersArray[playersNum].y = 2000
        removeElements()
    }
    if (restartTimer == 0 && gameOver == true) {
        socket.emit('restart')
    }
    if (gameOver == false && nonHostResetTimer == 0) {
        dead = false;
        nonHostResetTimer = 20;
        playersArray[playersNum].x = playersArray[0].x
        playersArray[playersNum].y = playersArray[0].y
    }
}, 1000)
socket.on('localReset', function() {
    gameOver = false;
    restartTimer = 5;
    shots = [];
    zeds = [];
    diffOffset = 0;
    shotTimer = 0;
    localShots = 0;
    playersArray = [];
    invulFrames = 30;
    localTime = 0;
    gameOver = false;
    dead = false;
    nonHostResetTimer = 20;
    waveNum = 1;
    waveInProgress = 1;
    playersArray[playersNum] = {
        x: 400,
        y: 300,
        speed: 2.5,
        shotTimer: 30,
        shotPen: 1,
        shotSpeed: 5,
        health: 1
    }
    for (var p = 0; p < playersArray.length; p++) {
        playersArray[p].x = 400
        playersArray[p].y = 300
    }
})
socket.on('endWave', function() {
    zeds.length = 0;
    zeds = [];
    for (var p = 0; p < zeds.length; p++) {
        zeds[p].x = 10000
        zeds[p].y = 10000
    }
    localWaveInProgress = false;
    socket.emit('zedUpdate', zeds)
    console.log('wave ended')
})
socket.on('startWave', function() {
    localWaveInProgress = true;
    console.log('wave started')
    removeElements();
    waveNum++;
    isUpgradeSetUp = false;
})

function setupUpgradeButtons() {
    if (isUpgradeSetUp == false) {
        zeds.length = 0;
        zeds = [];
        upgradeButtons[0] = createButton('Increase Movement Speed');
        upgradeButtons[0].position(400 + canvasMargin, 200);
        upgradeButtons[0].mousePressed(function() {
            upgradePlayer("speed")
            removeElements();
        });

        upgradeButtons[1] = createButton('Increase Fire Rate');
        upgradeButtons[1].position(400 + canvasMargin, 300);
        upgradeButtons[1].mousePressed(function() {
            upgradePlayer("shotTimer")
            removeElements();
        });

        upgradeButtons[2] = createButton('Increase Bullet Movement Speed');
        upgradeButtons[2].position(400 + canvasMargin, 400);
        upgradeButtons[2].mousePressed(function() {
            upgradePlayer("shotSpeed")
            removeElements();
        });

        upgradeButtons[2] = createButton('Increase Bullet Penetration');
        upgradeButtons[2].position(400 + canvasMargin, 500);
        upgradeButtons[2].mousePressed(function() {
            upgradePlayer("shotPen")
            removeElements();
        });

        upgradeButtons[3] = createButton('Increase Health');
        upgradeButtons[3].position(400, 600);
        upgradeButtons[3].mousePressed(function() {
            upgradePlayer("health")
            removeElements();
        });

        isUpgradeSetUp = true;
    }
}

function upgradePlayer(stat) {
    if (stat == "speed" && playersArray[playersNum].speed < 10) {
        playersArray[playersNum].speed += 0.5
    } else if (stat == "shotTimer" && playersArray[playersNum].shotTimer > 5) {
        playersArray[playersNum].shotTimer -= 2.5
        shotTimer = 0;
    } else if (stat == "shotSpeed") {
        playersArray[playersNum].shotSpeed += 0.5
    } else if (stat == "shotPen") {
        playersArray[playersNum].shotPen += 1
    } else if (stat == "health") {
        playersArray[playersNum].health += 1
    }
    socket.emit('updateplayer', playersNum, playersArray);
}
