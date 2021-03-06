var yVal = -1;
var xVal = 0;
var inGame = true;
var source = []
var playerSource;
var enemySource;
var playersTurn = true;
var selectedChara = 0;
var moveOptions = [];
// 0 is if should display(0 or 1), 1 is player[data,hit,dead], 2 is enemy[data,hit,dead],3+ should be background & stuff
var stats = [0, 0, 0];

function preload() {
    //load map
    source[0] = [];
    source[1] = [];
    source[0][0] = loadImage('img/grass.png')
    source[0][1] = loadImage('img/grass2.png')
    source[1][0] = loadImage('img/mountain.png')
    source[1][1] = loadImage('img/mountain2.png')
    source[1][source[1].length] = loadImage('img/mountain3.png')
    source[5] = loadImage('img/tree.png')
    //load player
    playerSource =loadImage('img/maybe.png')
    enemySource =loadImage('img/maybeEnemies.png')
    //load enenmy
}

function setup() {
    createCanvas(480, 320)
    background(0, 120, 120)
    for (var i = 1; i < testMapData.length; i++) {
        if (testMapData[i].t == 0) {
            testMapData[i].s = randomT(0, source[0].length - 1)
        } else if (testMapData[i].t == 1 && testMapData[i].s == undefined) {
            testMapData[i].s = randomT(0, source[1].length - 2)
        }
    }
}

function draw() {
    clear();
    background(0, 120, 120)
    if (inGame == true) {
        drawMap()
        drawPlayerCharacters()
        drawEnemies()
        drawInfobox()
    }
}

function drawMap() {
    yVal = -1;
    xVal = 0;
    strokeWeight(.25);
    for (var i = 1; i < testMapData.length; i++) {
        if (yVal <= testMapData[0].y && xVal <= testMapData[0].x) {
            var sourceIndex = -1
            if (i != 1) {
                xVal++;
            }
            if (i % testMapData[0].x - 1 === 0) {
                xVal = 0;
                yVal++;
            }
            if (testMapData[i].t == 0) {
                //grasslands
                //fill("#008000")
                sourceIndex = 0;
            } else if (testMapData[i].t == 1) {
                //impassible
                //fill("#404040")
                sourceIndex = 1;
            } else if (testMapData[i].t == 2) {
                //mountains
                fill("#808080")
            } else if (testMapData[i].t == 3) {
                //river
                fill("#0088bb")
            } else if (testMapData[i].t == 4) {
                //ocean
                fill("#004488")
            } else if (testMapData[i].t == 5) {
                //forest
                //fill("#004000")
                sourceIndex = 5;
            } else {
                fill("pink")
            }
            if (sourceIndex == -1) {
                rect((xVal * 32), (yVal * 32), 32, 32)
            } else {
                if (testMapData[i].t == 0) {
                    image(source[0][testMapData[i].s], (xVal * 32), (yVal * 32))
                    noFill();
                    rect((xVal * 32), (yVal * 32), 32, 32)
                } else if (testMapData[i].t == 1) {
                    image(source[1][testMapData[i].s], (xVal * 32), (yVal * 32))
                    noFill();
                    rect((xVal * 32), (yVal * 32), 32, 32)
                } else {
                    image(source[testMapData[i].t], (xVal * 32), (yVal * 32))
                    noFill();
                    rect((xVal * 32), (yVal * 32), 32, 32)
                }
            }
            testMapData[i].x = xVal;
            testMapData[i].y = yVal;
            testMapData[i].num = i;
        }
    }
}

function drawPlayerCharacters() {
    for (var i = 0; i < playerCharacters.length; i++) {
        if (playerCharacters[i].dead == false) {
            image(playerSource, playerCharacters[i].x * 32, playerCharacters[i].y*32,32,32,0,32*playerCharacters[i].img,32,32)
            noFill();
                    rect((xVal * 32), (yVal * 32), 32, 32)
            if (i == selectedChara) {

                fill("#fff")
                rect(playerCharacters[i].mx * 32, playerCharacters[i].my * 32, 32, 32)
            }
        }
    }
    for (var c = 0; c < moveArray.length; c++) {
        fill(color('rgba(0, 0, 255, 0.2)'));
        rect(moveArray[c].x * 32, moveArray[c].y * 32, 32, 32);
    }
}

function keyPressed() {
    if (playersTurn == true) {
        if (playerCharacters[selectedChara].pm > 0) {
            if (keyCode == 37 || keyCode == 65) {
                //left
                checkAndMoveback(playerCharacters[selectedChara], "left")
                checkAndMove(playerCharacters[selectedChara], "left")
            } else if (keyCode == 39 || keyCode == 68) {
                //right
                checkAndMoveback(playerCharacters[selectedChara], "right")
                checkAndMove(playerCharacters[selectedChara], "right")
            } else if (keyCode == 87 || keyCode == 38) {
                //up
                checkAndMoveback(playerCharacters[selectedChara], "up")
                checkAndMove(playerCharacters[selectedChara], "up")
            } else if (keyCode == 83 || keyCode == 40) {
                //down
                checkAndMoveback(playerCharacters[selectedChara], "down")
                checkAndMove(playerCharacters[selectedChara], "down")
            }
        } else if (playerCharacters[selectedChara].pm == 0) {
            if (keyCode == 37 || keyCode == 65) {
                //left
                checkAndMoveback(playerCharacters[selectedChara], "left")
            } else if (keyCode == 39 || keyCode == 68) {
                //right
                checkAndMoveback(playerCharacters[selectedChara], "right")
            } else if (keyCode == 87 || keyCode == 38) {
                //up
                checkAndMoveback(playerCharacters[selectedChara], "up")
            } else if (keyCode == 83 || keyCode == 40) {
                //down
                checkAndMoveback(playerCharacters[selectedChara], "down")
            }
        }
        if (keyCode == 13) {
            playerCharacters[selectedChara].y = playerCharacters[selectedChara].my
            playerCharacters[selectedChara].x = playerCharacters[selectedChara].mx
            playerCharacters[selectedChara].pm = playerCharacters[selectedChara].m
            attack()
            if (selectedChara == playerCharacters.length - 1) {
                endTurn()
            } else {
                /*if (playerCharacters[selectedChara].dead == true) {
                                    selectedChara++;
                                    moveArray = [{
                                        x: -1,
                                        y: -1
                                    }, {
                                        x: -1,
                                        y: -1
                                    }, {
                                        x: -1,
                                        y: -1
                                    }, {
                                        x: -1,
                                        y: -1
                                    }, {
                                        x: -1,
                                        y: -1
                                    }];
                                    playerCharacters[selectedChara].my = playerCharacters[selectedChara].y
                                    playerCharacters[selectedChara].mx = playerCharacters[selectedChara].x
                                }*/
                selectedChara++;
                moveArray = [{
                    x: -1,
                    y: -1
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: -1,
                    y: -1
                }, {
                    x: -1,
                    y: -1
                }];
                playerCharacters[selectedChara].my = playerCharacters[selectedChara].y
                playerCharacters[selectedChara].mx = playerCharacters[selectedChara].x
            }
        }
        if (keyCode == 16) {
            playerCharacters[selectedChara].my = playerCharacters[selectedChara].y
            playerCharacters[selectedChara].mx = playerCharacters[selectedChara].x
            playerCharacters[selectedChara].pm = playerCharacters[selectedChara].m
            moveArray = [{
                x: -1,
                y: -1
            }, {
                x: -1,
                y: -1
            }, {
                x: -1,
                y: -1
            }, {
                x: -1,
                y: -1
            }, {
                x: -1,
                y: -1
            }];

        }
    }
}

function drawEnemies() {
    for (var e = 0; e < testMapEnemies.length; e++) {
    image(enemySource, testMapEnemies[e].x * 32, testMapEnemies[e].y*32,32,32,0,32*testMapEnemies[e].img,32,32)
            noFill();
        rect((testMapEnemies[e].x * 32), (testMapEnemies[e].y * 32), 32, 32)
    }
}

function endTurn() {
    moveEnemies()
    selectedChara = 0;
    playerCharacters[selectedChara].my = playerCharacters[selectedChara].y
    playerCharacters[selectedChara].mx = playerCharacters[selectedChara].x
    moveArray = [{
        x: -1,
        y: -1
    }, {
        x: -1,
        y: -1
    }, {
        x: -1,
        y: -1
    }, {
        x: -1,
        y: -1
    }, {
        x: -1,
        y: -1
    }];
    checkForInfo()
}

function moveEnemies() {
    for (var p = 0; p < playerCharacters.length; p++) {
        for (var e = 0; e < testMapEnemies.length; e++) {
            if (playerCharacters[p].y - 1 == testMapEnemies[e].y && playerCharacters[p].x == testMapEnemies[e].x || playerCharacters[p].y + 1 == testMapEnemies[e].y && playerCharacters[p].x == testMapEnemies[e].x || playerCharacters[p].x - 1 == testMapEnemies[e].x && playerCharacters[p].y == testMapEnemies[e].y || playerCharacters[p].x + 1 == testMapEnemies[e].x && playerCharacters[p].y == testMapEnemies[e].y) {
                stats = [1, [playerCharacters[p], "", ""],
                    [testMapEnemies[e], "", ""]
                ]
                attack()
                console.log("attacked?")
                testMapEnemies[e].pm = 0;
            }
        }
    }
    for (var e = 0; e < testMapEnemies.length; e++) {
        if (testMapEnemies[e].ai != undefined) {
            if (testMapEnemies[e].ai == 1 && testMapEnemies[e].pm > 0) {
                testMapEnemies[e].x--
                    testMapEnemies[e].pm--
                    console.log("moved " + e)
            }
        }
    }
    for (var e = 0; e < testMapEnemies.length; e++) {
        testMapEnemies[e].pm = testMapEnemies[e].m
    }
}

function attack() {
    for (var e = 0; e < testMapEnemies.length; e++) {
        //check to attack
        if (playerCharacters[selectedChara].y - 1 == testMapEnemies[e].y && playerCharacters[selectedChara].x == testMapEnemies[e].x || playerCharacters[selectedChara].y + 1 == testMapEnemies[e].y && playerCharacters[selectedChara].x == testMapEnemies[e].x || playerCharacters[selectedChara].x - 1 == testMapEnemies[e].x && playerCharacters[selectedChara].y == testMapEnemies[e].y || playerCharacters[selectedChara].x + 1 == testMapEnemies[e].x && playerCharacters[selectedChara].y == testMapEnemies[e].y) {
            if (playersTurn == false) {
                attackMath(playerCharacters[selectedChara], testMapEnemies[e], e)
            } else {
                //moveOptions = [1, playerCharacters[selectedChara].mx, playerCharacters[selectedChara].my]
                attackMath(playerCharacters[selectedChara], testMapEnemies[e], e)
            }
        }
    }
}

function attackMath(player, enemy, e) {
    var aimed = [random(1, 100), random(1, 100)]
    //attack player
    if (aimed[0] <= player.aim && player.dead == false) {
        console.log("hit", aimed)
        enemy.hp -= player.strength
        stats[1][1] = "hit"
        if (enemy.hp < 1) {
            removeArrayElement(testMapEnemies, e)
            stats[2][2] = "dead"
        }
    } else {
        stats[1][1] = "miss"
    }

    if (aimed[1] <= enemy.aim && enemy.hp > 1) {
        console.log("hit", aimed)
        player.hp -= enemy.strength
        stats[2][1] = "hit"
        if (player.hp < 1) {
            player.dead = true;
            stats[1][2] = "dead"
        }
    } else {
        stats[2][1] = "miss"
    }
}

function checkAndMove(character, dir) {
    var done = false
    for (var m = 1; m < testMapData.length; m++) {
        if (dir == "up" && playerCharacters[selectedChara].my - 1 == testMapData[m].y && playerCharacters[selectedChara].mx == testMapData[m].x && testMapData[m].t != 1 && done == false) {
            setMoveArray()
            playerCharacters[selectedChara].my--
                done = true
        } else if (dir == "down" && playerCharacters[selectedChara].my + 1 == testMapData[m].y && playerCharacters[selectedChara].mx == testMapData[m].x && testMapData[m].t != 1 && done == false) {
            setMoveArray()
            playerCharacters[selectedChara].my++
                done = true
        } else if (dir == "left" && playerCharacters[selectedChara].mx - 1 == testMapData[m].x && playerCharacters[selectedChara].my == testMapData[m].y && testMapData[m].t != 1 && done == false) {
            setMoveArray()
            playerCharacters[selectedChara].mx--
                done = true
        } else if (dir == "right" && playerCharacters[selectedChara].mx + 1 == testMapData[m].x && testMapData[m].t != 1 && playerCharacters[selectedChara].my == testMapData[m].y && done == false) {
            setMoveArray()
            playerCharacters[selectedChara].mx++
                done = true
        } else {
            //probably make nudge noise
        }
    }
    checkForInfo()
}

function checkAndMoveback(character, dir) {
    var done = false
    for (var m = 1; m < moveArray.length; m++) {
        if (dir == "up" && playerCharacters[selectedChara].my - 1 == moveArray[m].y && playerCharacters[selectedChara].mx == moveArray[m].x && done == false || dir == "up" && playerCharacters[selectedChara].my - 1 == playerCharacters[selectedChara].y && playerCharacters[selectedChara].mx == playerCharacters[selectedChara].x && done == false) {
            unsetMoveArray()
            playerCharacters[selectedChara].my--
                done = true
        } else if (dir == "down" && playerCharacters[selectedChara].my + 1 == moveArray[m].y && playerCharacters[selectedChara].mx == moveArray[m].xdone == false || dir == "down" && playerCharacters[selectedChara].my + 1 == playerCharacters[selectedChara].y && playerCharacters[selectedChara].mx == playerCharacters[selectedChara].x && done == false) {
            unsetMoveArray()
            playerCharacters[selectedChara].my++
                done = true
        } else if (dir == "left" && playerCharacters[selectedChara].mx - 1 == moveArray[m].x && playerCharacters[selectedChara].my == moveArray[m].y && done == false || dir == "left" && playerCharacters[selectedChara].mx - 1 == playerCharacters[selectedChara].x && playerCharacters[selectedChara].my == playerCharacters[selectedChara].y && done == false) {
            unsetMoveArray()
            playerCharacters[selectedChara].mx--
                done = true
        } else if (dir == "right" && playerCharacters[selectedChara].mx + 1 == moveArray[m].x && playerCharacters[selectedChara].my == moveArray[m].y && done == false || dir == "right" && playerCharacters[selectedChara].mx + 1 == playerCharacters[selectedChara].x && playerCharacters[selectedChara].my == playerCharacters[selectedChara].y && done == false) {
            unsetMoveArray()
            playerCharacters[selectedChara].mx++
                done = true
        } else {
            return
        }

    }
    checkForInfo()
}

function setMoveArray() {
    moveArray[playerCharacters[selectedChara].pm].x = playerCharacters[selectedChara].mx
    moveArray[playerCharacters[selectedChara].pm].y = playerCharacters[selectedChara].my
    playerCharacters[selectedChara].pm--
}

function unsetMoveArray() {
    moveArray[playerCharacters[selectedChara].pm].x = -1
    moveArray[playerCharacters[selectedChara].pm].y = -1
    playerCharacters[selectedChara].pm++
}

function drawInfobox() {
    fill("black")
    rect(320, 0, 160, 320)
    textFont("pixel")
    textSize(16);
    fill("white");
    text(playerCharacters[selectedChara].name, 380, 64);
    textSize(8);
    text("Health: " + playerCharacters[selectedChara].hp, 380, 96);
    text("Strength: " + playerCharacters[selectedChara].strength, 380, 112);
    text("Magic: " + playerCharacters[selectedChara].magic, 380, 128);
    text("Mobility: " + playerCharacters[selectedChara].m, 380, 144);
    if (stats[0] == 1) {
        fill("white")
        rect(320, 224, 160, 320)
        fill("red")
        textSize(8);
        text("Aim: " + stats[2][0].aim, 336, 240);
        text("Strength: " + stats[2][0].strength, 336, 256);
        text(stats[2][1], 336, 272);
        text(stats[2][2], 336, 288);

        fill("blue")
        textSize(8);
        text("Aim: " + stats[1][0].aim, 432, 240);
        text("Strength: " + stats[1][0].strength, 432, 256);
        text(stats[1][1], 432, 272)
        text(stats[1][2], 432, 288);
    }
    if (moveOptions[0] == 1) {
        fill("white")
        rect(moveOptions[1] * 32 + 32, moveOptions[2] * 32, 64, 32)
        fill("black")
        textSize(8);
        text("Attack", moveOptions[1] * 32 + 32, moveOptions[2] * 32 + 8)
        text("Wait", moveOptions[1] * 32 + 32, moveOptions[2] * 32 + 16);

    }
}

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
//DEBUG
//for 10x10 map, 160px left over
function mousePressed() {
    console.log(mouseX, mouseY)
}

function random(min, max) {
    return Math.round((Math.random() * max) + min)
}

function randomT(min, max) {
    return Math.round((Math.random() * max) + min)
}

function checkForInfo() {
    for (var e = 0; e < testMapEnemies.length; e++) {
        //check for info stats
        if (playerCharacters[selectedChara].my - 1 == testMapEnemies[e].y && playerCharacters[selectedChara].mx == testMapEnemies[e].x || playerCharacters[selectedChara].my + 1 == testMapEnemies[e].y && playerCharacters[selectedChara].mx == testMapEnemies[e].x || playerCharacters[selectedChara].mx - 1 == testMapEnemies[e].x && playerCharacters[selectedChara].my == testMapEnemies[e].y || playerCharacters[selectedChara].mx + 1 == testMapEnemies[e].x && playerCharacters[selectedChara].my == testMapEnemies[e].y) {
            if (testMapEnemies != []) {

                stats = [1, [playerCharacters[selectedChara], "", ""],
                    [testMapEnemies[e], "", ""]
                ]
                return
            } else {
                stats = [0, 0, 0];
            }
        } else {
            stats = [0, 0, 0];
        }
    }
}