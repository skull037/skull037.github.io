//>'д'<\\
document.getElementById("titleStart").addEventListener("click", gameStart);
//player clicks button and this gets called
function gameStart() {
    gameOver = false
    if (document.getElementById("titleScreen") != null) {
        document.getElementById("titleScreen").style.visibility = "hidden";
    }
    changeScreen(0, "none");
    player.base = makeImage("Images/Characters/Player/PlayerForward.png", 377.5, 185, 32, 32)
    for (var i = 0; i < player.maxHealth; i++) {
        heartArray.push(makeImage("Images/Heart.png", 16 + (i * 32), 0, 16, 16));
    }
    moneyIcon = makeImage("Images/Items/BlueGem.png", 16, 32, 16, 16)
    moneyIcon = makeText("x" + player.money, 32, 48, 16, "VT323", "white", 1)
    music.play();
    if (endRestart == false) {
        update();
        setNpcs();
    } else {
        endRestart = false;
    }
}
function changeScreen(screen, direction) {
    if (screen != 63) {
        vsShadow = false;
    }
    if(screen !=78){
      vsBoss = false;
    }else if(screen ==78){
      vsBoss = true;
      bossStart = false;
    }
    //remove old elements
    canvas.innerHTML = ""
    for (var i = 0; i < enemies.length; i++) {
        setX(enemies[i].base, 1000000000000000)
        enemies[i].speed = 0;
        removeArrayElementBase(enemies, i)
        enemies = [];
    }
    for (var i = 0; i < backgroundArrayElements.length; i++) {
        removeArrayElement(backgroundArrayElements, i)
    }
    for (var i = 0; i < pickups.length; i++) {
        removeArrayElement(pickups, i)
    }
    for (var i = 0; i < exits.length; i++) {
        removeArrayElement(exits, i)
    }
    for (var i = 0; i < shop.length; i++) {
        removeArrayElementBase(shop, i)
    }
    for (var i = 0; i < barrier.length; i++) {
        removeArrayElement(barrier, i)
        barrier = []
    }
    for (var i = 0; i < fireShooter.length; i++) {
        removeArrayElementBase(fireShooter, i)
        if (fireShooter.length > 0) {
            removeArrayElementBase(fireShooter, i)
        }
    }
    for (var i = 0; i < fireShooterBalls.length; i++) {
        setX(fireShooterBalls[i].base, 1000000000000000)
    }
    for (var i = 0; i < npc.length; i++) {
        removeArrayElement(npc, i)
        npc = [];
    }
    removeElement(levelText);
    background = makeImage(backgroundArray[screen].base, 0, 0, 800, 400)
    if (direction == "north") {
        player.base = makeImage("Images/Characters/Player/Playerbackward.png", 384, 344, 32, 32)
    } else if (direction == "south") {
        player.base = makeImage("Images/Characters/Player/PlayerForward.png", 384, 50, 32, 32)
    } else if (direction == "east") {
        setY(player.base, 344)
        player.base = makeImage("Images/Characters/Player/PlayerSideB.png", 32, 200, 32, 32)
    } else if (direction == "west") {
        setY(player.base, 24)
        player.base = makeImage("Images/Characters/Player/PlayerSideA.png", 736, 200, 32, 32)
    }
    for (var i = 0; i < heartArray.length; i++) {
        if (heartArray[i].getAttribute("xlink:href") == "Images/Heart.png") {
            heartArray[i] = (makeImage("Images/Heart.png", 16 + (i * 32), 0, 16, 16));
        } else if (heartArray[i].getAttribute("xlink:href") == "Images/EmptyHeart.png") {
            heartArray[i] = (makeImage("Images/EmptyHeart.png", 16 + (i * 32), 0, 16, 16));
        }
    }
    moneyIcon = makeImage("Images/Items/BlueGem.png", 16, 32, 16, 16)
    moneyIcon = makeText("x" + player.money, 32, 48, 16, "VT323", "white", 1)
    if (backgroundArray[screen].backgroundElements.length > 0) {
        for (var i = 0; i < backgroundArray[screen].backgroundElements.length; i++)
            backgroundArrayElements[i] = (makeImage(backgroundArray[screen].backgroundElements[i].url, backgroundArray[screen].backgroundElements[i].x, backgroundArray[screen].backgroundElements[i].y, backgroundArray[screen].backgroundElements[i].width, backgroundArray[screen].backgroundElements[i].height))
    }
    if (backgroundArray[screen].puzzle != undefined && backgroundArray[screen].puzzle.length > 0) {
        for (var i = 0; i < backgroundArray[screen].puzzle.length; i++)
            backgroundArrayElements[i] = {
                base: (makeImage(backgroundArray[screen].puzzle[i].url, backgroundArray[screen].puzzle[i].x, backgroundArray[screen].puzzle[i].y, backgroundArray[screen].puzzle[i].width, backgroundArray[screen].puzzle[i].height)),
                door: backgroundArray[screen].puzzle[i].door,
                status: backgroundArray[screen].puzzle[i].status,
                type: backgroundArray[screen].puzzle[i].type,
                effects: backgroundArray[screen].puzzle[i].effects
            }
    }
    if (backgroundArray[screen].exits.length > 0) {
        for (var i = 0; i < backgroundArray[screen].exits.length; i++)
            if (backgroundArray[screen].exits[i].url == undefined) {
                exits[i] = {
                    base: (makeRect(backgroundArray[screen].exits[i].x, backgroundArray[screen].exits[i].y, backgroundArray[screen].exits[i].width, backgroundArray[screen].exits[i].height, backgroundArray[screen].exits[i].color, backgroundArray[screen].exits[i].opacity)),
                    screenToLoad: backgroundArray[screen].exits[i].screenToLoad,
                    direction: backgroundArray[screen].exits[i].direction
                }
            } else {
                exits[i] = {
                    base: (makeImage(backgroundArray[screen].exits[i].url, backgroundArray[screen].exits[i].x, backgroundArray[screen].exits[i].y, backgroundArray[screen].exits[i].width, backgroundArray[screen].exits[i].height, backgroundArray[screen].exits[i].color, backgroundArray[screen].exits[i].opacity)),
                    screenToLoad: backgroundArray[screen].exits[i].screenToLoad,
                    direction: backgroundArray[screen].exits[i].direction
                }
            }
    }
    if (backgroundArray[screen].barrier != undefined && backgroundArray[screen].barrier.length > 0) {
        for (var i = 0; i < backgroundArray[screen].barrier.length; i++) {
            barrier[i] = {
                base: makeImage(backgroundArray[screen].barrier[i].url, backgroundArray[screen].barrier[i].x, backgroundArray[screen].barrier[i].y, backgroundArray[screen].barrier[i].width, backgroundArray[screen].barrier[i].height),
                direction: backgroundArray[screen].barrier[i].direction,
                rect: (makeRect(backgroundArray[screen].barrier[i].rect.x, backgroundArray[screen].barrier[i].rect.y, backgroundArray[screen].barrier[i].rect.width, backgroundArray[screen].barrier[i].rect.height, backgroundArray[screen].barrier[i].rect.color, backgroundArray[screen].barrier[i].rect.opacity)),
            }
        }
    }
    if (backgroundArray[screen].enemies.length > 0) {
        for (var i = 0; i < backgroundArray[screen].enemies.length; i++) {
            enemies[i] = {
                base: makeImage(backgroundArray[screen].enemies[i].url, backgroundArray[screen].enemies[i].x, backgroundArray[screen].enemies[i].y, backgroundArray[screen].enemies[i].width, backgroundArray[screen].enemies[i].height),
                health: backgroundArray[screen].enemies[i].health
            }
        }
    }
    if (backgroundArray[screen].fireShooter != undefined && backgroundArray[screen].fireShooter.length > 0) {
        shootFire(screen);
        for (var i = 0; i < backgroundArray[screen].fireShooter.length; i++) {
            fireShooter[i] = {
                base: makeImage(backgroundArray[screen].fireShooter[i].url, backgroundArray[screen].fireShooter[i].x, backgroundArray[screen].fireShooter[i].y, backgroundArray[screen].fireShooter[i].width, backgroundArray[screen].fireShooter[i].height),
                shootDir: backgroundArray[screen].fireShooter[i].shootDir
            }
        }
    }
    if (backgroundArray[screen].shop != undefined && backgroundArray[screen].shop.length > 0) {
        for (var i = 0; i < backgroundArray[screen].shop.length; i++) {
            shop[i] = {
                base: makeImage(backgroundArray[screen].shop[i].url, backgroundArray[screen].shop[i].x, backgroundArray[screen].shop[i].y, backgroundArray[screen].shop[i].width, backgroundArray[screen].shop[i].height),
                price: backgroundArray[screen].shop[i].price,
                text: backgroundArray[screen].shop[i].text,
                stock: backgroundArray[screen].shop[i].stock,
            }
        }
    }
    if (backgroundArray[screen].npc != undefined && backgroundArray[screen].npc.length > 0) {
        for (var i = 0; i < backgroundArray[screen].npc.length; i++) {
            npc[i] = {
                base: makeImage(backgroundArray[screen].npc[i].url, backgroundArray[screen].npc[i].x, backgroundArray[screen].npc[i].y, backgroundArray[screen].npc[i].width, backgroundArray[screen].npc[i].height),
                move: backgroundArray[screen].npc[i].move,
                text: backgroundArray[screen].npc[i].text,
                textCount: backgroundArray[screen].npc[i].textCount
            }
        }
    }
    if(screen == 30&& wizardDead == true){
        exits[exits.length] = {
            base: makeRect(250, -25, 300, 50, "orange", 0),
            screenToLoad: 79,
            direction: "north"
        }
    }
    else if(screen == 79){
      levelText = makeText("Didnt code this yet. Come back in a while.", 300, 200, 32, "VT323", "white", 1)
      totallyDone = false;
      tFadeDone = false;
      textFade(levelText);
    }
    northNum = 0;
    southNum = 0;
    westNum = 0;
    eastNum = 0;
    for (var x = 0; x < exits.length; x++) {
        if (exits[x].direction == "north") {
            northNum++
        }
        if (exits[x].direction == "east") {
            eastNum++
        }
        if (exits[x].direction == "west") {
            westNum++
        }
        if (exits[x].direction == "south") {
            southNum++
        }
    }
    if (northNum == 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "north",
            rect: (makeRect(0, 0, 1000, 48, "white", 0)),
        }
    } else if (northNum != 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "north",
            rect: (makeRect(0, 0, 250, 48, "white", 0)),
        }
        barrier[barrier.length] = {
            base: "?",
            direction: "north",
            rect: (makeRect(550, 0, 250, 48, "white", 0)),
        }
    }
    if (southNum == 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "south",
            rect: (makeRect(0, 350, 1000, 48, "white", 0)),
        }
    } else if (southNum != 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "south",
            rect: (makeRect(0, 345, 250, 48, "white", 0)),
        }
        barrier[barrier.length] = {
            base: "?",
            direction: "south",
            rect: (makeRect(550, 345, 250, 48, "white", 0)),
        }
    }
    if (eastNum == 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "east",
            rect: (makeRect(750, 0, 48, 4800, "white", 0)),
        }
    }
    if (eastNum != 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "east",
            rect: (makeRect(750, 0, 48, 100, "white", 0)),
        }
        barrier[barrier.length] = {
            base: "?",
            direction: "east",
            rect: (makeRect(750, 300, 48, 100, "white", 0)),
        }
    }
    if (westNum == 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "west",
            rect: (makeRect(0, 0, 48, 4800, "white", 0)),
        }
    } else if (westNum != 0) {
        barrier[barrier.length] = {
            base: "?",
            direction: "west",
            rect: (makeRect(0, 0, 48, 100, "white", 0)),
        }
        barrier[barrier.length] = {
            base: "?",
            direction: "west",
            rect: (makeRect(0, 300, 48, 100, "white", 0)),
        }
    }
    if(screen==31){
      if(knightBossDead == true){
        setX(enemies[0].base,1000000000)
      }
      barrier[barrier.length] = {
          base: "?",
          direction: "east",
          rect: (makeRect(750, 0, 48, 4800, "white", 0)),
      }
    }
    if (screen == 14 && dun1Left == true && dun1Right == true && barrier[1] != undefined) {
        move(barrier[1].base, -1000, 0)
        move(barrier[1].rect, -1000, 0)
    } else if (screen == 33) {
        if (shop[1].stock != 0) {
            itemText = makeText("Heart Container 50", 500, 264, 32, "VT323", "white", 1)
        } else if (shop[1].stock == 0) {
            itemText = makeText("Sold out", 500, 264, 32, "VT323", "white", 1)
        }
        itemText = makeText("Heart 20", 150, 264, 32, "VT323", "white", 1)
        if (player.health != 1) {
            storeText = makeText("Hurry up and buy something!", 250, 32, 32, "VT323", "white", 1)
        } else if (player.health == 1) {
            storeText = makeText("It'd be a shame if you died, you should buy something!", 75, 32, 32, "VT323", "white", 1)
        }
    } else if (screen == 1 && direction == "north") {
        levelText = makeText("Forgotten Forest", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 68 && direction == "west") {
        levelText = makeText("Ruined Castle", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 64 && direction == "west") {
        levelText = makeText("Old Ruins", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 63 && direction == "north" && shadowBoss == false) {
        if (player.maxHealth != 3) {
            levelText = makeText("I am your shadow. Your true self.", 200, 200, 32, "VT323", "white", 1)
            totallyDone = false;
            tFadeDone = false;
            textFade(levelText);
        } else {
            levelText = makeText("I am your shadow. Your true self. You cannot defeat me.", 50, 200, 32, "VT323", "white", 1)
            totallyDone = false;
            tFadeDone = false;
            textFade(levelText);
        }
    } else if (screen == 55 && direction == "south") {
        levelText = makeText("Tiny Town", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 20 && direction == "east") {
        levelText = makeText("Deadly Desert", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
        music.pause();
        music = new Audio("Sounds/Cyborg Ninja.mp3")
        music.play();
        music.volume = 0.5
    } else if (screen == 19 && direction == "west") {
        music.pause();
        music = new Audio("Sounds/Overworld.mp3")
        music.play();
        music.volume = 0.5
    } else if (screen == 46 && direction == "south") {
        levelText = makeText("Peaceful Plains", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 48 && direction == "east" || screen == 49 && direction == "east") {
        levelText = makeText("Blissful Beaches", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 34 && direction == "east") {
        levelText = makeText("Desert Dungeon", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 13) {
        levelText = makeText("Forest Dungeon", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    } else if (screen == 60 && direction == "east") {
        levelText = makeText("Water Dungeon", 300, 200, 32, "VT323", "white", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
    }
}
var keyState = {};
window.addEventListener('keydown', function(e) {
    keyState[e.keyCode || e.which] = true;
}, true);
window.addEventListener('keyup', function(e) {
    keyState[e.keyCode || e.which] = false;
    attacked = false;
}, true);

function playerMove() {
    if (player.health >= 1) {
        if (keyState[32] && swordCool == 0 && attacked == false) {
            swordCool = 15;
            playerAttackSound.play();
            attacked = true;
            if (player.lastDir == "up") {
                player.swordAttack = makeRect(getX(player.base) + 8, getY(player.base) + 32, 16, 32, "white", 0.05)
                player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerAttackFront.png")
                Attack(player.swordAttack);
            } else if (player.lastDir == "down") {
                player.swordAttack = makeRect(getX(player.base) + 8, getY(player.base) - 32, 16, 32, "white", 0.05)
                player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerAttackBack.png")
                Attack(player.swordAttack);
            } else if (player.lastDir == "left") {
                player.swordAttack = makeRect(getX(player.base) - 32, getY(player.base) + 8, 32, 16, "white", 0.05)
                player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerAttackSide.png")
                Attack(player.swordAttack);
            } else if (player.lastDir == "right") {
                player.swordAttack = makeRect(getX(player.base) + 32, getY(player.base) + 8, 32, 16, "white", 0.05)
                player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerAttackSideB.png")
                Attack(player.swordAttack);
            }
        } else if (keyState[37] || keyState[65]) {
            move(player.base, -2.5 - player.speed, 0)
            player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerSideA.png")
            player.lastDir = "left";
        } else if (keyState[39] || keyState[68]) {
            move(player.base, 2.5 + player.speed, 0)
            player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerSideB.png")
            player.lastDir = "right";
        } else if (keyState[40] || keyState[83]) {
            move(player.base, 0, 2.5 + player.speed)
            player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/playerForward.png")
            player.lastDir = "up";
        } else if (keyState[38] || keyState[87]) {
            move(player.base, 0, -2.5 - player.speed)
            player.base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Player/PlayerBackward.png")
            player.lastDir = "down";
        }
    }
}

function shadowMove() {
    if (keyState[37] || keyState[65]) {
        move(enemies[0].base, 2.5 - player.speed, 0)
        enemies[0].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Shadow/ShadowSideA.png")
        player.lastDir = "left";
    } else if (keyState[39] || keyState[68]) {
        move(enemies[0].base, -2.5 + player.speed, 0)
        enemies[0].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Shadow/ShadowSide.png")
        player.lastDir = "right";
    } else if (keyState[40] || keyState[83]) {
        move(enemies[0].base, 0, -2.5 + player.speed)
        enemies[0].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Shadow/ShadowBack.png")
        player.lastDir = "up";
    } else if (keyState[38] || keyState[87]) {
        move(enemies[0].base, 0, 2.5 - player.speed)
        enemies[0].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Characters/Shadow/ShadowFront.png")
        player.lastDir = "down";
    } else if (keyState[32] && swordCool == 0 && attacked == false) {
        swordCool = 15;
        playerAttackSound.play();
        attacked = true;
        if (player.lastDir == "up") {
            player.swordAttack = makeRect(getX(player.base) + 8, getY(player.base) + 32, 16, 32, "white", 0.25)
            Attack(player.swordAttack);
        } else if (player.lastDir == "down") {
            player.swordAttack = makeRect(getX(player.base) + 8, getY(player.base) - 32, 16, 32, "white", 0.25)
            Attack(player.swordAttack);
        } else if (player.lastDir == "left") {
            player.swordAttack = makeRect(getX(player.base) - 32, getY(player.base) + 8, 32, 16, "white", 0.25)
            Attack(player.swordAttack);
        } else if (player.lastDir == "right") {
            player.swordAttack = makeRect(getX(player.base) + 32, getY(player.base) + 8, 32, 16, "white", 0.25)
            Attack(player.swordAttack);
        }
    }
}

function Attack(swordAttack) {
    for (var i = 0; i < backgroundArrayElements.length; i++) {
        if (backgroundArrayElements[i].base == undefined && collide(swordAttack, backgroundArrayElements[i]) == true && backgroundArrayElements[i].getAttribute("xlink:href") == "Images/BackgroundElements/Grass/Grass1.png" || backgroundArrayElements[i].base == undefined && collide(swordAttack, backgroundArrayElements[i]) == true && backgroundArrayElements[i].getAttribute("xlink:href") == "Images/BackgroundElements/Grass/Grass2.png") {
            var itemChange = random(1, 8);
            if (itemChange == 1) {
                pickups[pickups.length] = (makeImage("Images/Items/BlueGem.png", getX(backgroundArrayElements[i]) + 8, getY(backgroundArrayElements[i]) + 8, 16, 20))
            } else if (itemChange == 2 && player.health < heartArray.length) {
                pickups[pickups.length] = (makeImage("Images/Items/HeartPickUp.png", getX(backgroundArrayElements[i]) + 8, getY(backgroundArrayElements[i]) + 8, 16, 20))
            }
            removeArrayElement(backgroundArrayElements, i);
        } else if (backgroundArrayElements[i].base != undefined && collide(swordAttack, backgroundArrayElements[i].base) == true && backgroundArrayElements[i].base.getAttribute("xlink:href") == "Images/BackgroundElements/Puzzle/OrbOff.png") {
            backgroundArrayElements[i].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/BackgroundElements/Puzzle/OrbOn.png")
            backgroundArrayElements[i].status = "on";

            if (backgroundArrayElements[i].type == "switch-EW") {
                backgroundArrayElements[i].door = "west";
                barrier[backgroundArrayElements[i].effects].direction = "west"
                barrier[backgroundArrayElements[i].effects].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Screens/BarrierWest.png")
                setX(barrier[backgroundArrayElements[i].effects].rect, 0)
            } else if (backgroundArrayElements[i].type == "dun1Left") {
                dun1Left = true
            } else if (backgroundArrayElements[i].type == "dun1Right") {
                dun1Right = true
            } else if(barrier[backgroundArrayElements[i].effects].base != undefined){

                move(barrier[backgroundArrayElements[i].effects].base, -1000, 0)
                move(barrier[backgroundArrayElements[i].effects].rect, -1000, 0)
            }
        } else if (backgroundArrayElements[i].base != undefined && collide(swordAttack, backgroundArrayElements[i].base) == true && backgroundArrayElements[i].base.getAttribute("xlink:href") == "Images/BackgroundElements/Puzzle/OrbOn.png") {
            backgroundArrayElements[i].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/BackgroundElements/Puzzle/OrbOff.png")
            backgroundArrayElements[i].status = "off";

            if (backgroundArrayElements[i].type == "switch-EW") {
                backgroundArrayElements[i].door = "east";
                barrier[backgroundArrayElements[i].effects].direction = "east"
                barrier[backgroundArrayElements[i].effects].base.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Screens/BarrierEast.png")
                setX(barrier[backgroundArrayElements[i].effects].rect, 750)
            } else if(barrier[backgroundArrayElements[i].effects].base != "?" && barrier[backgroundArrayElements[i].effects].rect != "?"){
                move(barrier[backgroundArrayElements[i].effects].base, -1000, 0)
                move(barrier[backgroundArrayElements[i].effects].rect, -1000, 0)
            }
        }
    }
    for (var i = 0; i < enemies.length; i++) {
        if (collide(swordAttack, enemies[i].base) == true) {
            enemies[i].health -= 1;
            if (enemies[i].health == 0) {
                var itemChange = random(1, 8);
                if (itemChange == 1) {
                    pickups[pickups.length] = (makeImage("Images/Items/BlueGem.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                } else if (itemChange == 2 && player.health < heartArray.length) {
                    pickups[pickups.length] = (makeImage("Images/Items/HeartPickUp.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                }
                if (enemies[i].base.getAttribute("xlink:href") == "Images/Characters/Skeleton/SkeletonBoss.gif" && skeletonBossDead == false) {
                    pickups[pickups.length] = (makeImage("Images/Heart.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                    skeletonBossDead = true;
                } else if (enemies[i].base.getAttribute("xlink:href") == "Images/Characters/Knight/BossKnight.gif" && knightBossDead == false) {
                    pickups[pickups.length] = (makeImage("Images/Heart.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                    knightBossDead = true;
                } else if (enemies[i].base.getAttribute("xlink:href") == "Images/Characters/Knight/knightElite.gif") {
                    if (itemChange == 3) {
                        pickups[pickups.length] = (makeImage("Images/Items/PurpleGem.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                    }
                } else if (vsShadow == true && shadowBoss == false) {
                    player.health -= 1;
                    playerHitSound.play();
                    heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/EmptyHeart.png")
                    invul = 180;
                    vsShadow = false;
                    if (player.health > 0) {
                        pickups[pickups.length] = (makeImage("Images/Heart.png", getX(enemies[i].base) + 8, getY(enemies[i].base) + 8, 16, 20))
                        shadowBoss = true;
                    }
                }
                removeArrayElementBase(enemies, i);
            } else if (enemies[i].base.getAttribute("xlink:href") == "Images/Characters/Skeleton/SkeletonBoss.gif") {
                smoke = makeImage("Images/Characters/Smoke.png", getX(enemies[i].base), getY(enemies[i].base), 128, 128)
                setTimeout(removeElement, 1000, smoke);
                var spawn = random(1, 4);
                if (spawn == 1) {
                    setX(enemies[i].base, 0)
                    setY(enemies[i].base, 0)
                } else if (spawn == 2) {
                    setX(enemies[i].base, 0)
                    setY(enemies[i].base, 300)
                } else if (spawn == 3) {
                    setX(enemies[i].base, 700)
                    setY(enemies[i].base, 0)
                } else if (spawn == 4) {
                    setX(enemies[i].base, 700)
                    setY(enemies[i].base, 300)
                }
                smoke = makeImage("Images/Characters/Smoke.png", 0, 0, 128, 128)
                setTimeout(removeElement, 1000, smoke);
                smoke = makeImage("Images/Characters/Smoke.png", 0, 300, 128, 128)
                setTimeout(removeElement, 1000, smoke);
                smoke = makeImage("Images/Characters/Smoke.png", 700, 300, 128, 128)
                setTimeout(removeElement, 1000, smoke);
                smoke = makeImage("Images/Characters/Smoke.png", 700, 0, 128, 128)
                setTimeout(removeElement, 1000, smoke);
                enemies[enemies.length] = {
                    base: makeImage("Images/Characters/Skeleton/Skeleton.gif", 400, 0, 36, 36),
                    health: 1
                };
            } else if (enemies[i].base.getAttribute("xlink:href") == "Images/Characters/Knight/BossKnight.gif") {
                var block = random(1, 4)
                if (block == 1) {
                    enemies[i].health += 1;
                }
            } else if (vsShadow == true) {
                player.health -= 1;
                playerHitSound.play();
                heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/EmptyHeart.png")
                invul = 180;
            } else {
                if (getX(player.base) < getX(enemies[i].base)) {
                    move(enemies[i].base, 36, 0)
                } else if (getX(player.base) > getX(enemies[i].base)) {
                    move(enemies[i].base, -36, 0)
                }
            }
        }
    }
    setTimeout(removeElement, 20, player.swordAttack);
}

function update() {
    if (player.health > 0) {
        moneyIcon.innerHTML = ("x" + player.money)
        checkCollisions();
        moveEnemies();
        playerMove();
        moveNpcs();
        if (invul > 0) {
            invul--;
        }
        if (swordCool > 0) {
            swordCool--;
        }
        if (fireShooter.length > 0 || boss.health > 5) {
            fireShooterFunction();
        }
        setTimeout(update, 10)
    } else {
        if (gameOver == false) {
            vsShadow = false;
            size = 0;
            if (boss == "" || vsBoss == false) {
                gameOverRect = makeRect(0, 0, 1000, 1000, 'black', 0)
            } else {
                gameOverRect = makeRect(0, 0, 1000, 1000, 'red', 0)
            }
            makeText("GAME OVER", 300, 200, 32, "VT323", "white", 1)
            continueText = makeText("CONTINUE", 300, 300, 32, "VT323", "white", 1)
            player.health = player.maxHealth;
            heartArray = [];
            continueText.addEventListener("click", function() {
                music.pause();
                music = new Audio("Sounds/Overworld.mp3")
                music.play();
                music.volume = 0.5
                canvas.innerHTML = "";
                gameStart()
            })
            gameOver = true
            gameOverAnimation();
        }
    }
}

function checkCollisions() {
    for (var i = 0; i < exits.length; i++) {
        if (collide(player.base, exits[i].base, 0, 0) == true) {
            changeScreen(exits[i].screenToLoad, exits[i].direction)
        }
    }
    if (shop[0] != undefined) {
        for (var i = 0; i < shop.length; i++) {
            if (collide(player.base, shop[i].base, 0, 0) == true) {
                if (player.money > shop[i].price - 1) {
                    if (shop[i].base.getAttribute("xlink:href") == "Images/Items/HeartPickUp.png" && player.health < player.maxHealth) {
                        backgroundArray[33].shop[i].stock -= 1
                        storeText.innerHTML = "Thank you";
                        player.money -= shop[i].price
                        heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Heart.png")
                        player.health += 1;
                        removeArrayElementBase(shop, i)
                    } else if (shop[i].base.getAttribute("xlink:href") == "Images/Items/HeartPickUp.png" && player.health == player.maxHealth) {
                        storeText.innerHTML = "Lose some health first!";
                    } else if (shop[i].base.getAttribute("xlink:href") == "Images/Heart.png") {
                        if (player.health < player.maxHealth) {
                            for (var j = 0; j < heartArray.length; j++) {
                                if (heartArray[j].getAttribute("xlink:href") == "Images/EmptyHeart.png") {
                                    heartArray[j] = (makeImage("Images/Heart.png", 16 + (j * 32), 0, 16, 16));
                                }
                            }
                        }
                        storeText.innerHTML = "Heheheh thank you"
                        player.money -= shop[i].price
                        backgroundArray[33].shop[i].stock -= 1;
                        heartArray.push(makeImage("Images/Heart.png", 16 + (heartArray.length * 32), 0, 16, 16));
                        player.maxHealth += 1;
                        player.health = player.maxHealth;
                        removeArrayElementBase(shop, i)
                    }
                    if (backgroundArray[33].shop[i].stock == 0) {
                        backgroundArray[33].shop[i].x = "1000"
                    }
                } else if (player.money < shop[i].price) {
                    storeText.innerHTML = "You don't have enough sapphires!"
                }
            }
        }
    }
    for (var i = 0; i < barrier.length; i++) {
        if (collide(player.base, barrier[i].rect, 0, 0) == true) {
            if (barrier[i].direction == "north") {
                move(player.base, 0, 16)
            } else if (barrier[i].direction == "east") {
                move(player.base, -16, 0)
            } else if (barrier[i].direction == "west") {
                move(player.base, 16, 0)
            } else if (barrier[i].direction == "south") {
                move(player.base, 0, -16)
            }
        }
    }
    for (var i = 0; i < enemies.length; i++) {
        if (collide(player.base, enemies[i].base, 0, 0) == true && invul == 0) {
            player.health -= 1;
            playerHitSound.play();
            heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/EmptyHeart.png")
            invul = 180;
            if (getX(player.base) < getX(enemies[i].base)) {
                move(player.base, -36, 0)
            } else if (getX(player.base) > getX(enemies[i].base)) {
                move(player.base, 36, 0)
            }
        }
    }
    for (var i = 0; i < fireShooterBalls.length; i++) {
        if (collide(player.base, fireShooterBalls[i].base, 0, 0) == true && invul == 0) {
            player.health -= 1;
            playerHitSound.play();
            heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/EmptyHeart.png")
            invul = 180;
            if (getX(player.base) < getX(fireShooterBalls[i].base)) {
                move(player.base, -36, 0)
            } else if (getX(player.base) > getX(fireShooterBalls[i].base)) {
                move(player.base, 36, 0)
            }
        }
    }
    for (var i = 0; i < pickups.length; i++) {
        if (pickups[i].getAttribute("xlink:href") == "Images/Items/BlueGem.png" && collide(player.base, pickups[i], 0, 0) == true) {
            removeArrayElement(pickups, i)
            player.money += 1;

        } else if (pickups[i].getAttribute("xlink:href") == "Images/Items/PurpleGem.png" && collide(player.base, pickups[i], 0, 0) == true) {
            removeArrayElement(pickups, i)
            player.money += 25;

        } else if (pickups[i].getAttribute("xlink:href") == "Images/Items/HeartPickUp.png" && collide(player.base, pickups[i], 0, 0) == true && player.health != player.maxHealth) {
            removeArrayElement(pickups, i)
            heartArray[player.health].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "Images/Heart.png")
            player.health += 1;
        } else if (pickups[i].getAttribute("xlink:href") == "Images/Heart.png" && collide(player.base, pickups[i], 0, 0) == true) {
            if (player.health < player.maxHealth) {
                for (var j = 0; j < heartArray.length; j++) {
                    if (heartArray[j].getAttribute("xlink:href") == "Images/EmptyHeart.png") {
                        heartArray[j] = (makeImage("Images/Heart.png", 16 + (j * 32), 0, 16, 16));
                    }
                }
            }
            heartArray.push(makeImage("Images/Heart.png", 16 + (heartArray.length * 32), 0, 16, 16));
            player.maxHealth += 1;
            player.health = player.maxHealth;
            removeArrayElement(pickups, i)
        }
    }
}

function moveEnemies() {
    if (enemies.length > 0) {
        if (enemies[0] != undefined && enemies[0].base.getAttribute("xlink:href") == "Images/Characters/Shadow/ShadowFront.png" || vsShadow == true) {
            shadowMove();
            vsShadow = true;
        }
        if (enemies[0] != undefined && enemies[0].base.getAttribute("xlink:href") == "Images/Characters/Wizard/Wizard.png" && bossStart == false) {
            bossStart = true;
            boss = enemies[0];
            setTimeout(startFinalBoss, 1000)
        }
        if (enemies[0] != undefined && enemies[0].base.getAttribute("xlink:href") != "Images/Characters/Shadow/ShadowFront.png" && vsShadow == false && enemies[0].base.getAttribute("xlink:href") != "Images/Characters/Knight/knightCrossbow.png") {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].base.getAttribute("xlink:href") != "Images/Characters/Wizard/lightning.png" && enemies[i].base.getAttribute("xlink:href") != "Images/Characters/Wizard/Wizard.png") {
                    if (getX(player.base) < getX(enemies[i].base)) {
                        move(enemies[i].base, -1, 0)
                    } else if (getX(player.base) > getX(enemies[i].base)) {
                        move(enemies[i].base, 1, 0)
                    }
                    if (getY(player.base) < getY(enemies[i].base)) {
                        move(enemies[i].base, 0, -1)
                    } else if (getY(player.base) > getY(enemies[i].base)) {
                        move(enemies[i].base, 0, 1)
                    }
                }
            }
        }
    }
}

function setNpcs() {
    var randomMove = random(1, 4);
    if (npc.length > 0) {
        for (var i = 0; i < npc.length; i++) {
            if (randomMove == 1 && getX(npc[i].base) < 700) {
                npc[i].move = "right"
            } else if (randomMove == 2 && getX(npc[i].base) > 100) {
                npc[i].move = "left"
            }
            if (randomMove == 3 && getY(npc[i].base) > 100) {
                npc[i].move = "up"
            } else if (randomMove == 4 && getY(npc[i].base) < 300) {
                npc[i].move = "down"
            }
        }
    }
    npcText = []
    setTimeout(setNpcs, 500);
}

function moveNpcs() {
    npcText = []
    if (npc.length > 0) {
        for (var i = 0; i < npc.length; i++) {
            if (npc[i].move == "right") {
                move(npc[i].base, 0.5, 0)
            } else if (npc[i].move == "left") {
                move(npc[i].base, -0.5, 0)
            }
            if (npc.move == "up") {
                move(npc[i].base, 0, -05)
            } else if (npc[i].move == "down") {
                move(npc[i].base, 0, 0.5)
            }
            if (collide(player.base, npc[i].base) == true && npc[i].textCount < 1) {
                npc[i].textCount++;
                npcText[npcText.length] = makeText(npc[i].text, getX(npc[i].base), getY(npc[i].base), 16, "VT323", "white", 1);
            } else if (collide(player.base, npc[i].base) == false && npc[i].textCount == 1) {
                npc[i].textCount--;
                for (var m = 0; m < npcText.length; m++) {
                    removeArrayElement(npcText, m)
                }
            }
        }
    }
}

function fireShooterFunction() {
    for (var j = 0; j < fireShooterBalls.length; j++) {
        if (fireShooterBalls[j].shootDir == "down") {
            move(fireShooterBalls[j].base, 0, 5);
        } else if (fireShooterBalls[j].shootDir == "up") {
            move(fireShooterBalls[j].base, 0, -5);
        } else if (fireShooterBalls[j].shootDir == "right") {
            move(fireShooterBalls[j].base, 5, 0);
        } else if (fireShooterBalls[j].shootDir == "left") {
            move(fireShooterBalls[j].base, -5, 0);
        } else if (fireShooterBalls[j].shootDir == "follow") {}
        if (getX(fireShooterBalls[j].base) < 0 || getX(fireShooterBalls[j].base) > 800 || getY(fireShooterBalls[j].base) < 0 || getY(fireShooterBalls[j].base) > 400) {
            removeArrayElementBase(fireShooterBalls, j)
        }
    }
}

function shootFire(screen) {
    for (var i = 0; i < fireShooter.length; i++) {
        if (fireShooterBalls.length < fireShooter.length) {
            fireShooterBalls[fireShooterBalls.length] = {
                base: makeImage("Images/Characters/FireShooter/Fire.png", getX(fireShooter[i].base), getY(fireShooter[i].base), 32, 32),
                shootDir: fireShooter[i].shootDir
            }
        }
    }
    if (backgroundArray[screen].fireShooter != undefined && backgroundArray[screen].fireShooter.length > 0)
        setTimeout(shootFire, 1000, screen)
}
var bossSpeed = 0;

function startFinalBoss() {
    var smoke = makeImage("Images/Characters/Smoke.png", getX(boss.base) - 50, getY(boss.base) - 50, 128, 128)
    setTimeout(removeElement, 1000, smoke);
    setX(boss.base, -50)
    setY(boss.base, 0)
    finalBossLoop();
}

function finalBossLoop() {
  if(vsBoss == true){
    bossSpeed = 500
    if (boss.health > 5 && evilBreak == false) {
        bossSpeed = 500
        move(boss.base, 50, 0)
        if (getX(boss.base) > 800 && evilBreak == false) {
            setX(boss.base, 400)
            setY(boss.base, 200)
            evilBreak = true;
            setTimeout(function() {
                var smoke = makeImage("Images/Characters/Smoke.png", getX(boss.base) - 50, getY(boss.base) - 50, 128, 128)
                setTimeout(removeElement, 1000, smoke);
                setX(boss.base, -50)
                setY(boss.base, 0)
                evilBreak = false
            }, 1000)

        }
        fireShooterBalls[fireShooterBalls.length] = {
            base: makeImage("Images/Characters/fireShooter/fire.png", getX(boss.base) - 16, getY(boss.base) + 32, 32, 32),
            shootDir: "down"
        }
    } else if (boss.health > 2 && evilBreak == false) {
        setX(boss.base, random(64, 728))
        setY(boss.base, random(64, 200))
        bossSpeed = 2000
        var xOffSet = 192;
        if (getX(boss.base) > 400) {
            xOffSet = -128
        }
        enemies[enemies.length] = {
            base: makeImage("Images/Characters/Wizard/lightning.png", getX(player.base) - xOffSet, getY(player.base) - 64, 128, 256),
            health: 9999,
            speed: 0
        }
        setTimeout(function() {
            for (var i = 1; i < enemies.length; i++) {
                setX(enemies[i].base, 100000000)
            }
        }, 500)
    } else if (boss.health > 0 && evilBreak == false) {
        setX(boss.base, random(64, 728))
        setY(boss.base, random(64, 200))
        bossSpeed = 2000
        enemies[enemies.length] = {
            base: makeImage("Images/Characters/Skeleton/Skeleton.gif", getX(boss.base), getY(boss.base), 36, 36),
            health: 1,
            speed: 1
        };
    } else if (boss.health == 0) {
              enemies = [];
              for (var j = 0; j < heartArray.length; j++) {
                  if (heartArray[j].getAttribute("xlink:href") == "Images/EmptyHeart.png") {
                      heartArray[j] = (makeImage("Images/Heart.png", 16 + (j * 32), 0, 16, 16));
                  }
              }
            heartArray.push(makeImage("Images/Heart.png", 16 + (heartArray.length * 32), 0, 16, 16));
            player.maxHealth += 1;
        wizardDead = true;
        endRestart = true;
        creditsFunction();
        boss.health = -1;
    }
    if (player.health > 0&& boss.health > 0) {
        setTimeout(finalBossLoop, bossSpeed)
    }
}
}
var creditsState = 0;

function creditsFunction() {
    gameOverRect = makeRect(0, 0, 1000, 1000, 'white', 0)
    gameOverAnimation();
    if (player.maxHealth == 3 || player.maxHealth == 4 || player.maxHealth == 5 || player.maxHealth == 6) {
        creditsArray[6] = "THERE IS STILL MUCH TO EXPLORE"
    } else if (player.maxHealth == 7) {
        creditsArray[6] = "THERE IS A NEW DUNGEON HIDDEN IN THE DESERT"
    }

    setTimeout(displayCredits, 2500)
}

function displayCredits() {
    if (creditsState < creditsArray.length) {
        levelText = makeText(creditsArray[creditsState], 300, 200, 32, "VT323", "black", 1)
        totallyDone = false;
        tFadeDone = false;
        textFade(levelText);
        setTimeout(function() {
            creditsState++;
            displayCredits();
        }, 2500)
    } else {
        continueText = makeText("CONTINUE", 300, 300, 32, "VT323", "black", 1)
        continueText.addEventListener("click", function() {
            player.health = player.maxHealth;
            heartArray = [];
            music.pause();
            music = new Audio("Sounds/Overworld.mp3")
            music.play();
            music.volume = 0.5
            canvas.innerHTML = "";
            gameStart()
        })
    }
}
