var TextBoard = document.getElementById("TextBoard");
var PlayerKeys = document.getElementById("playerKeys");
var PlayerPotions = document.getElementById("playerPotions");
var PlayerKeysInt = 0;
var PlayerPotionsInt = 0;
var PlayerHealthInt = 10;
var PlayerHealth = document.getElementById("playerHealth");
var PlayerSword = document.getElementById("playerSword");
var CurrentFloor = 0;
var IsDead = false;
//room info
var roomItems = [
    room1Items = {
        key: 1,
        sword: 0,
        potion: 0,
        door1: true,
        monster1: false,
        door: {
            isLocked: true,
            health: 3
        },
        altar: false,
        walls: true,
        floor: true
    },
    room2Items = {
        desc: ("You <span style='color:green'> GO TO</span> the next room." + "</br> The <span style='color:blue'> WALLS</span> and <span style='color:blue'> FLOOR</span> are made of stone. There is <span style='color:yellow'> KEY</span> on the floor." + "</br> There is a <span style='color:#a00'> MONSTER</span> in the room." + "</br>" + "There is a wooden <span style='color:orange'> DOOR</span> behind the <span style='color:#a00'> MONSTER</span>." + "</br>"),
        key: 1,
        potion: 0,
        sword: 0,
        door1: true,
        door: {
            isLocked: true,
            health: 3
        },
        monster1: true,
        monster: {
            health: 3
        },
        altar: false,
        walls: true,
        floor: true
    },
    room3Items = {
        desc: ("You <span style='color:green'> GO TO</span> the next room. </br> The <span style='color:blue'> <span style='color:blue'> WALLS</span></span> and <span style='color:blue'> FLOOR</span> are made of stone. There is a <span style='color:#777'> SWORD</span> and <span style='color:pink'>POTION</span> on the floor. </br>There is a wooden <span style='color:orange'> DOOR</span> in front of you.</br>"),
        key: 0,
        potion: 1,
        sword: 1,
        door1: true,
        door: {
            isLocked: true,
            health: 3
        },
        monster1: false,
        altar: false,
        walls: true,
        floor: true
    },
    room4Items = {
        desc: ("You <span style='color:green'> GO TO</span> the next room. </br>The <span style='color:blue'> <span style='color:blue'> WALLS</span></span> and <span style='color:blue'> FLOOR</span> are made of a dark red stone. The air seems warmer than before. </br>There is a <span style='color:#a00'> MONSTER</span> in the room. </br>There is a wooden <span style='color:orange'> DOOR</span> behind the <span style='color:#a00'> MONSTER</span>.</br>"),
        key: 0,
        sword: 0,
        potion: 0,
        door1: true,
        door: {
            isLocked: true,
            health: 3
        },
        monster1: true,
        monster: {
            health: 5
        },
        altar: false,
        walls: true,
        floor: true
    },
    room5Items = {
        desc: ("You <span style='color:green'> GO TO</span> the next room. You step outside into a courtyard.</br> The sky is <span style='color:#700'>red</span>. You cannot tell if it day or night.</br> There is an <span style='color:#a30'>ALTAR</span> in the middle of the courtyard.</br> There does not seem to be an exit.</br>"),
        key: 0,
        sword: 0,
        potion: 0,
        door1: true,
        door: {
            isLocked: true,
            health: 3
        },
        monster1: true,
        monster: {
            health: 5
        },
        altar: true,
        walls: false,
        floor: false
    },
    roomEndItems = {
        desc: ("You WAKE up. You seem to be in another stone room but this looks newer than the last.</br> You are on top of a <span style='color:purple'>BED</span>. There is a STRONG<span style='color:orange'> DOOR</span> to the left.<br><span style='color:gold'> TO BE CONTINUED...? </span>" + "</br>"),
        key: 0,
        sword: 0,
        potion: 0,
        door1: true,
        door: {
            isLocked: true,
            health: 1000
        },
        monster1: false,
        monster: {
            health: 5
        },
        altar: false,
        bed: true,
        walls: true,
        floor: true
    },
    roomvoidItems = {
        desc: ("All you can see is DARKNESS. You feel like you are not supposed to be here. You <span style='color:green'>HEAR</span> a <span style='color:#0aa'>VOICE</span> 'YOU ARE NOT SUPPOSED TO BE HERE.'" + "</br>"),
        key: 0,
        sword: 0,
        door1: false,
        door: {
            isLocked: true,
            health: 300
        },
        monster1: false,
        monster: {
            health: 300
        },
        walls: false,
        floor: false
    }
];
//player items
var playerItems = {
    key: 0,
    sword: false
};
Start();

function Start() {
    TextBoard.innerHTML += ("You awaken in a dark room. You cannot remember how you got here." + "</br>");
    TextBoard.innerHTML += ("The <span style='color:blue'> <span style='color:blue'> WALLS</span></span> and <span style='color:blue'> FLOOR</span> are made of stone. There is a <span style='color:yellow'>KEY</span> on the floor." + "</br>");
    TextBoard.innerHTML += ("There is a wooden <span style='color:orange'> DOOR</span> in font of you." + "</br>");
}
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        var textInput = document.getElementById("textInput").value;
        textInput = textInput.toLowerCase();
        document.getElementById("textInput").value = "";
        commands(textInput);
    }
})

function commands(data) {
    data = data.split(" ");
    if (data[1] == "at") {
        data[1] = data[2];
    } else if (data[1] == "the") {
        data[1] = data[2];
    }
    if (data[2] == "with" || data[2] == "on") {
        data[2] = data[3];
    }
    //checks if player is dead
    if (IsDead == false) {
        //trying to take things
        if (data[0] == "take" || data[0] == "get") {
            if (data[1] == "key" && roomItems[CurrentFloor].key > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> TOOK</span> the<span style='color:yellow'> KEY</span>." + "</br>";
                roomItems[CurrentFloor].key -= 1;
                PlayerKeysInt += 1;
                PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt
                playerItems.key += 1;
            } else if (data[1] == "key" && roomItems[CurrentFloor].key == 0) {
                TextBoard.innerHTML += "You cannot find <span style='color:yellow'> KEY</span>." + "</br>";
            } else if (data[1] == "potion" && roomItems[CurrentFloor].potion == 0) {
                TextBoard.innerHTML += "You cannot find <span style='color:pink'> POTION</span>." + "</br>";
            } else if (data[1] == "walls" && roomItems[CurrentFloor].walls == true || data[1] == "wall" && roomItems[CurrentFloor].walls == true) {
                TextBoard.innerHTML += "You try to <span style='color:green'> TAKE</span> the <span style='color:blue'> WALLS</span> but they won't budge." + "</br>";
            } else if (data[1] == "floor" && roomItems[CurrentFloor].floor == true) {
                TextBoard.innerHTML += "You try to <span style='color:green'> TAKE</span> the <span style='color:blue'> FLOOR</span> but to no avail." + "</br>";
            } else if (data[1] == "bed" && roomItems[CurrentFloor].bed == true) {
                TextBoard.innerHTML += "You try to <span style='color:green'> TAKE</span> the <span style='color:purple'> BED</span> but it won't fit." + "</br>";
            } else if (data[1] == "potion" && roomItems[2].potion > 0) {
                roomItems[CurrentFloor].potion -= 1;
                PlayerPotionsInt += 1;
                PlayerPotions.innerHTML = "POTIONS:" + PlayerPotionsInt
                TextBoard.innerHTML += "You <span style='color:green'> TAKE</span> the <span style='color:pink'> POTION</span>" + "</br>" + "'<span style='color:green'> USE</span> <span style='color:pink'> POTION</span> on self' to drink it </br>";
            } else if (data[1] == "potion" && roomItems[CurrentFloor].potion > 0) {
                roomItems[CurrentFloor].potion -= 1;
                PlayerPotionsInt += 1;
                PlayerPotions.innerHTML = "POTIONS:" + PlayerPotionsInt
                TextBoard.innerHTML += "You <span style='color:green'> TAKE</span> the <span style='color:pink'> POTION</span>" + "</br>";
            } else if (data[1] == "sword" && roomItems[CurrentFloor].sword > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> TOOK</span> the <span style='color:#777'> SWORD</span>. It shines brightly.</br>";
                playerItems.sword = true;
                roomItems[CurrentFloor].sword -= 1;
                PlayerSword.innerHTML = "SWORD: TRUE";
                PlayerSword.html = "<span style='color:#777'> SWORD</span>: TRUE";
            } else if (data[1] == "sword" && roomItems[CurrentFloor].sword == 0) {
                TextBoard.innerHTML += "You cannot find a <span style='color:#777'> SWORD</span>." + "</br>";
            } else if (data[1] == "door" && roomItems[CurrentFloor].door1 == true) {
                TextBoard.innerHTML += "You try to <span style='color:green'> TAKE</span> the <span style='color:orange'> DOOR</span> but to no avail. It is LOCKED. Must be some other way to OPEN it." + "</br>";
            } else if (data[1] == "self") {
                TextBoard.innerHTML += "You try to <span style='color:green'> TAKE</span> yourself. Seems PHYSICS is preventing you." + "</br>";
            } else {
                TextBoard.innerHTML += "You tried to <span style='color:green'> TAKE</span> a " + data[1] + " but couldn't find one. Try something else." + "</br>";
            }
        }
        //trying to look at things
        else if (data[0] == "look") {
            TextBoard.innerHTML += "You <span style='color:green'> LOOK</span>";
            if (data[1] == "walls" && roomItems[CurrentFloor].walls == true &&CurrentFloor!=3|| data[1] == "wall" && roomItems[CurrentFloor].walls == true&&CurrentFloor!=3) {
                TextBoard.innerHTML += " at the <span style='color:blue'> WALLS</span>. The <span style='color:blue'> WALLS</span> are old, cracked, and made of stone." + "</br>";
            } else if (data[1] == "floor" && roomItems[CurrentFloor].floor == true && roomItems[CurrentFloor].key > 0) {
                TextBoard.innerHTML += " at the <span style='color:blue'> FLOOR</span>. The <span style='color:blue'> FLOOR</span> is old, cracked, and made of stone. There is a<span style='color:yellow'> KEY</span> on the <span style='color:blue'> FLOOR</span>." + "</br>";
            }else if (data[1] == "walls" && roomItems[CurrentFloor].walls == true&&CurrentFloor==3|| data[1] == "wall" && roomItems[CurrentFloor].walls == true&&CurrentFloor==3) {
                TextBoard.innerHTML += " at the <span style='color:blue'> FLOOR</span>. The <span style='color:blue'> WALLS</span> are old, cracked, and made of a red stone. The stones are warm." + "</br>";
            } else if (data[1] == "floor" && roomItems[CurrentFloor].floor == true && roomItems[CurrentFloor].sword > 0) {
                TextBoard.innerHTML += " at the <span style='color:blue'> FLOOR</span>. The <span style='color:blue'> FLOOR</span> is old, cracked, and made of stone. There is a <span style='color:#777'> SWORD</span> on the <span style='color:blue'> FLOOR</span>." + "</br>";
            } else if (data[1] == "floor" && roomItems[CurrentFloor].floor == true) {
                TextBoard.innerHTML += " at the <span style='color:blue'> FLOOR</span>. The <span style='color:blue'> FLOOR</span> is old, cracked, and made of stone." + "</br>";
            } else if (data[1] == "key" && roomItems[CurrentFloor].key > 0 || data[1] == "key" && playerItems.key > 0) {
                TextBoard.innerHTML += " at the <span style='color:yellow'>KEY</span>. It is old, scratched, and made of a silver metal. You can <span style='color:green'> TAKE</span> it." + "</br>";
            } else if (data[1] == "door" && roomItems[CurrentFloor].door1 == true) {
                TextBoard.innerHTML += " at the <span style='color:orange'> DOOR</span>. The <span style='color:orange'> DOOR</span> is old, scratched, and made of wood. You might be able to <span style='color:green'> ATTACK</span> it or use a<span style='color:yellow'> KEY</span>." + "</br>";
            } else if (data[1] == "monster" && roomItems[CurrentFloor].monster1 == false) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER </span>. But there isn't one in this room. Other than you." + "</br>";
            } else if (data[1] == "sword" && roomItems[CurrentFloor].sword > 0 || data[1] == "sword" && playerItems.sword == true) {
                TextBoard.innerHTML += " the <span style='color:#777'> SWORD</span>. It is bright and made of a silver metal. It can increase your <span style='color:green'> ATTACK</span>." + "</br>";
            } else if (data[1] == "potion" && roomItems[CurrentFloor].potion > 0) {
                TextBoard.innerHTML += " the Potion. It is bubbling. It is in a clear flask." + "</br>";
            } else if (data[1] == "monster" && roomItems[CurrentFloor].monster1 == true) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER </span>. It is big, strong, and green. It can <span style='color:green'> ATTACK</span>." + "</br>";
            } else if (data[1] == undefined || data[1] == null) {
                TextBoard.innerHTML += " at something but couldn't. Try '<span style='color:green'> LOOK</span> at <span style='color:blue'> WALLS</span>'." + "</br>";
            } else if (data[1] == "altar" && roomItems[CurrentFloor].altar == true) {
                TextBoard.innerHTML += " at the <span style='color:#a30'>ALTAR</span>. It has spikes on each corner. There are engravings of skulls all over." + "</br>";
            } else if (data[1] == "self") {
                TextBoard.innerHTML += " at yourself. You are wearing your usual clothes but with more holes and dirt. You can feel something in your forehead." + "</br>";
            } else if (data[1] == "bed"&&roomItems[CurrentFloor].bed == true) {
                TextBoard.innerHTML += " at the <span style='color:purple'>BED</span>. It is clean. It has a blue blanket." + "</br>";
            }
             else {
                TextBoard.innerHTML += " at " + data[1] + " but couldn't find it. Try something else." + "</br>";
            }

        }
        //trying to attack things
        else if (data[0] == "attack") {
            TextBoard.innerHTML += "You <span style='color:green'> ATTACK</span>";
            if (data[1] == "door" && roomItems[CurrentFloor].door1 == true && playerItems.sword == false) {
                TextBoard.innerHTML += " the <span style='color:orange'> DOOR</span> with punches and kicks. The <span style='color:orange'> DOOR</span> takes 1 <span style='color:#cc0033'> DAMAGE </span>. You 1 <span style='color:#cc0033'> DAMAGE </span> from <span style='color:green'> ATTACKING</span> without a <span style='color:#777'> SWORD</span>." + "</br>";
                PlayerHealthInt -= 1;
                roomItems[CurrentFloor].door.health -= 1;
                if (roomItems[CurrentFloor].door.health == 0) {
                    roomItems[CurrentFloor].door.isLocked = false;
                    roomItems[CurrentFloor].door1 = false;
                    if (CurrentFloor == 0) {
                        TextBoard.innerHTML += "You destroyed the <span style='color:orange'> DOOR</span>! Now you can '<span style='color:green'> GO TO</span> <span style='color:orange'> DOOR</span>' it." + "</br>";
                    } else {
                        TextBoard.innerHTML += "You destroyed the <span style='color:orange'> DOOR</span>!" + "</br>";
                    }
                }
            } else if (data[1] == "door" && roomItems[CurrentFloor].door1 == true && playerItems.sword == true) {
                TextBoard.innerHTML += " the <span style='color:orange'> DOOR</span> with your <span style='color:#777'> SWORD</span>. The <span style='color:orange'> DOOR</span> takes 3 <span style='color:#cc0033'> DAMAGE </span>." + "</br>";
                roomItems[CurrentFloor].door.health -= 3;
                if (roomItems[CurrentFloor].door.health == 0) {
                    roomItems[CurrentFloor].door.isLocked = false;
                    roomItems[CurrentFloor].door1 = false;
                    TextBoard.innerHTML += "You destroyed the <span style='color:orange'> DOOR</span>!" + "</br>";
                }
            } else if (data[1] == "walls" && roomItems[CurrentFloor].walls == true || data[1] == "wall" && roomItems[CurrentFloor].walls == true) {
                TextBoard.innerHTML += " the <span style='color:blue'> WALLS</span> with a fury of blows. The <span style='color:blue'> WALLS</span> take no <span style='color:#cc0033'> DAMAGE </span>." + "</br>";
            } else if (data[1] == "floor" && roomItems[CurrentFloor].floor == true) {
                TextBoard.innerHTML += " the <span style='color:blue'> FLOOR</span> with many kicks. The <span style='color:blue'> FLOOR</span> takes no <span style='color:#cc0033'> DAMAGE </span>." + "</br>";
            } else if (data[1] == "key" && roomItems[CurrentFloor].key > 0) {
                TextBoard.innerHTML += " the<span style='color:yellow'> KEY</span>. The<span style='color:yellow'> KEY</span> BREAKS. You'll have to find another way out." + "</br>";
                roomItems[CurrentFloor].key -= 1;
            } else if (data[1] == "monster" && roomItems[CurrentFloor].monster1 == false) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER</span>. But there isn't one in this room. Other than you." + "</br>";
            }  else if (data[1] == "self" && PlayerSword == true) {
                TextBoard.innerHTML += " yourself. 5 <span style='color:#cc0033'> DAMAGE </span> dealt. Stop slicing yourself." + "</br>";
                PlayerHealthInt -= 5;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            }else if (data[1] == "self") {
                TextBoard.innerHTML += " yourself. 1 <span style='color:#cc0033'> DAMAGE </span> dealt. Stop hitting yourself." + "</br>";
                PlayerHealthInt -= 1;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else if (data[1] == "bed"&&roomItems[CurrentFloor].bed == true) {
                TextBoard.innerHTML += " the <span style='color:purple'>BED</span>. It does not <span style='color:green'>LOOK</span> fit to sleep in anymore. You <span style='color:green'>HOPE</span> you will not be stuck here for long." + "</br>";
                roomItems[CurrentFloor].bed = false;
            }
            else if (data[1] == "help"||data[1] == "help"&&data[2] == "menu") {
                TextBoard.innerHTML += " the <span style='color:green'>HELP</span> menu?!?" + "</br>";
                document.getElementById("HelpArea").innerHTML = "";
            }else if (data[1] == "monster" && roomItems[CurrentFloor].monster1 == true && playerItems.sword == true) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER</span>. 3 <span style='color:#cc0033'> DAMAGE </span> DEALT. The <span style='color:#a00'> MONSTER</span> <span style='color:green'> ATTACKS</span> for 2 <span style='color:#cc0033'> DAMAGE </span>" + "</br>";
                PlayerHealthInt -= 2;
                roomItems[CurrentFloor].monster.health -= 3;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
                if (roomItems[CurrentFloor].monster.health <= 0) {
                    roomItems[CurrentFloor].monster1 = false;
                    TextBoard.innerHTML += "You killed the <span style='color:#a00'> MONSTER</span>!" + "</br>";
            }
            } else if (data[1] == "monster" && roomItems[CurrentFloor].monster1 == true) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER</span>. 1 <span style='color:#cc0033'> DAMAGE </span> DEALT. The <span style='color:#a00'> MONSTER</span> <span style='color:green'> ATTACKS</span> for 2 <span style='color:#cc0033'> DAMAGE </span>" + "</br>";
                PlayerHealthInt -= 2;
                roomItems[CurrentFloor].monster.health -= 1;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
                if (roomItems[CurrentFloor].monster.health == 0) {
                    roomItems[CurrentFloor].monster1 = false;
                    TextBoard.innerHTML += "You killed the <span style='color:#a00'> MONSTER</span>!" + "</br>";
                }
            } else if (data[1] == "altar" && roomItems[CurrentFloor].altar == true) {
                TextBoard.innerHTML += " the<span style='color:#a30'> ALTAR</span>. You got <span style='color:green'> STRUCK</span> by <span style='color:#0aa'>LIGHTNING</span> for 2 <span style='color:#cc0033'>DAMAGE</span>." + "</br>";
                PlayerHealthInt -= 2;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else {
                TextBoard.innerHTML += " a " + data[1] + " but that doesn't exist. Try something else." + "</br>";
            }
        }
        //trying to use two items
        else if (data[0] == "use") {
            if (data[4] == "wall") {
                data[4] = "walls"
            }
            if (data[1] == "key" && data[2] == "door" && roomItems[CurrentFloor].door1 == true && playerItems.key > 0) {
                if (CurrentFloor == 0) {
                    TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on the <span style='color:orange'> DOOR</span>. The <span style='color:orange'> DOOR</span> UNLOCKS! The<span style='color:yellow'> KEY</span> breaks. Now you can '<span style='color:green'> GO TO</span> <span style='color:orange'> DOOR</span>'." + "</br>";
                } else {
                    TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on the <span style='color:orange'> DOOR</span>. The <span style='color:orange'> DOOR</span> UNLOCKS! The<span style='color:yellow'> KEY</span> breaks." + "</br>";
                }
                playerItems.key -= 1;
                PlayerKeysInt -= 1;
                roomItems[CurrentFloor].door.isLocked = false;
                PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt;
            } else if (data[1] == "key" && data[2] == "walls" && roomItems[CurrentFloor].walls == true && playerItems.key > 0 || data[1] == "key" && data[2] == "wall" && roomItems[CurrentFloor].walls == true && playerItems.key > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on the <span style='color:blue'> WALLS</span>. You spend 3 HOURS trying to find a KEY HOLE. The<span style='color:yellow'> KEY</span> seems more DENTED than before." + "</br>";
            } else if (data[1] == "key" && data[2] == "floor" && roomItems[CurrentFloor].floor == true && playerItems.key > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on the <span style='color:blue'> FLOOR</span>. Nothing happens!" + "</br>";
            } else if (data[1] == "key" && data[2] == "monster" && roomItems[CurrentFloor].monster1 == true && playerItems.key > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on the <span style='color:#a00'> MONSTER</span>. The <span style='color:#a00'> MONSTER</span> seems ANNOYED. It <span style='color:green'> ATTACKS</span> you for 2 <span style='color:#cc0033'> DAMAGE </span>." + "</br>";
                PlayerHealthInt -= 2;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else if (data[1] == "potion" && data[2] == "walls" && roomItems[CurrentFloor].walls == true && PlayerPotionsInt > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> a small amount of the<span style='color:pink'> POTION</span> on the <span style='color:blue'> WALLS</span>. The <span style='color:blue'>WALLS</span> <span style='color:green'>LOOK</span> less <span style='color:#cc0033'>DAMAGED</span>." + "</br>";
            } else if (data[1] == "potion" && data[2] == "floor" && roomItems[CurrentFloor].floor == true && PlayerPotionsInt > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> a small amount of the<span style='color:pink'> POTION</span> on the <span style='color:blue'> FLOOR</span>. The <span style='color:blue'>FLOOR</span> <span style='color:green'>LOOKS</span> less <span style='color:#cc0033'>DAMAGED</span>." + "</br>";

            } else if (data[1] == "potion" && data[2] == "door" && roomItems[CurrentFloor].door1 == true && PlayerPotionsInt > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> a small amount of the<span style='color:pink'> POTION</span> on the <span style='color:orange'> DOOR</span>. The <span style='color:orange'>DOOR</span> <span style='color:green'>LOOKS</span> less SCRATCHED." + "</br>";
            } else if (data[1] == "potion" && data[2] == "monster" && roomItems[CurrentFloor].monster1 == true && PlayerPotionsInt > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:pink'> POTION</span> on the <span style='color:#a00'> MOSNTER</span>. The <span style='color:#a00'>MOSNTER</span> SCREAMS in pain. 3<span style='color:#cc0033'> DAMAGE </span>DELT." + "</br>";
                PlayerPotionsInt -= 1;
                PlayerPotions.innerHTML = "POTIONS: " + PlayerPotionsInt;
                roomItems[CurrentFloor].monster.health -= 3;
            } else if (data[1] == "potion" && data[2] == "self" && PlayerPotionsInt > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:pink'> POTION</span> on Yourself. You regain 5 HEALTH." + "</br>";
                PlayerHealthInt += 5;
                PlayerPotionsInt -= 1;
                PlayerPotions.innerHTML = "POTIONS: " + PlayerPotionsInt;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else if (data[1] == "key" && data[2] == "yourself" && playerItems.key > 0 || data[1] == "key" && data[2] == "self" && playerItems.key > 0) {
                TextBoard.innerHTML += "You <span style='color:green'> USED</span> the<span style='color:yellow'> KEY</span> on YOURSELF. You UNLOCKED the SECRETS of the UNIVERSE. There is a small DENT from where you STABBED YOURSELF. Was it worth it?" + "</br>";
                TextBoard.innerHTML += "The <span style='color:blue'> WALLS</span>, <span style='color:blue'> FLOOR</span>, and EVERYTHING else DISAPPEARS!" + "</br>";
                TextBoard.innerHTML += "You are FREE!" + "</br>";
                TextBoard.innerHTML += "<span style='color:gold'> JOKE ENDING</span>" + "</br>";
                PlayerHealthInt -= 1;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else if (data[1] == "key" && playerItems.key == 0) {
                TextBoard.innerHTML += "You don't have a<span style='color:yellow'> KEY</span>." + "</br>";
            } else if (data[1] == "potion" && PlayerPotionsInt == 0) {
                TextBoard.innerHTML += "You don't have a<span style='color:pink'> POTION</span>." + "</br>";
            } else {
                TextBoard.innerHTML += "You tried to USE " + data[1] + " on " + data[2] + " but couldn't." + "</br>";
            }
        }
        //go to place / thing
        else if (data[0] == "go" && data[1] == "to") {
            TextBoard.innerHTML += "You <span style='color:green'> GO TO</span>";
            if (data[2] == "door" && roomItems[CurrentFloor].door.isLocked == false) {
                TextBoard.innerHTML += " the <span style='color:orange'> DOOR</span>." + "</br>";
                GoToNextRoom();
            } else if (data[2] == "walls" && roomItems[CurrentFloor].walls == true) {
                TextBoard.innerHTML += " the <span style='color:blue'> WALLS</span>. You go back to the middle of the room." + "</br>";
            } else if (data[2] == "door" && roomItems[CurrentFloor].door.isLocked == true) {
                TextBoard.innerHTML += " the <span style='color:orange'> DOOR</span>. It is LOCKED. Try to find a way to UNLOCK it." + "</br>";
            } else if (data[2] == "floor" && roomItems[CurrentFloor].floor == true) {
                TextBoard.innerHTML += " the <span style='color:blue'> FLOOR</span>. You go back to the middle of the room." + "</br>";
            } else if (data[2] == "monster" && roomItems[CurrentFloor].monster1 == true) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER</span>. It <span style='color:green'> ATTACKS</span> you for 2 <span style='color:#cc0033'> DAMAGE </span>. You go back to the middle of the room." + "</br>";
                PlayerHealthInt -= 2;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
            } else if (data[2] == "monster" && roomItems[CurrentFloor].monster1 == false) {
                TextBoard.innerHTML += " the <span style='color:#a00'> MONSTER</span>. You stay put." + "</br>";
            } else if (data[2] == "altar" && roomItems[CurrentFloor].altar == true) {
                TextBoard.innerHTML += " the <span style='color:#a30'>ALTAR</span>. You lie down on the <span style='color:#a30'>ALTAR</span>. You are <span style='color:green'> STRUCK</span> by <span style='color:#0aa'>LIGHTNING</span>. Everything goes black." + "</br>";
                PlayerHealthInt = 1;
                PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
                PlayerKeysInt = 0;
                PlayerKeys.innerHTML = "KEYS: " + PlayerKeysInt;
                PlayerPotionsInt = 0;
                PlayerPotions.innerHTML = "POTIONS: " + PlayerPotionsInt;
                GoToNextRoom();
            } else if (data[2] == "key" && roomItems[CurrentFloor].key > 0) {
                TextBoard.innerHTML += " the<span style='color:yellow'> KEY</span>. You pick it up.'<span style='color:green'> TAKE</span><span style='color:yellow'> KEY</span>' also works." + "</br>";
                roomItems[CurrentFloor].key -= 1;
                PlayerKeysInt += 1;
                PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt;
                playerItems.key += 1;
            } else if (data[2] == "potion" && roomItems[CurrentFloor].potion > 0) {
                TextBoard.innerHTML += " the<span style='color:pink'> POTION</span>. You pick it up.'<span style='color:green'> TAKE</span><span style='color:pink'> POTION</span>' also works." + "</br>";
                roomItems[CurrentFloor].potion -= 1;
                PlayerPotionInt += 1;
                PlayerPotions.innerHTML = "POTIONS:" + PlayerPotionInt;
            }else if (data[2] == "bed" && roomItems[CurrentFloor].bed == true) {
                TextBoard.innerHTML += " the<span style='color:purple'> BED</span>. You get a good nights sleep. HEALTH restored" + "</br>";
                PlayerHealthInt = 10;
                PlayerHealth.innerHTML = "HEALTH:" + PlayerHealthInt;
            } else {
                TextBoard.innerHTML += " " + data[2] + ". You go back to the middle of the room." + "</br>";
            }
        }
          else if (data[0] == "help") {
            if (CurrentFloor == 0) {
              TextBoard.innerHTML += "'<span style='color:green'>TAKE </span><span style='color:yellow'>KEY</span>' adds the <span style='color:yellow'>KEY</span> to your inventory.'<span style='color:green'>USE</span> <span style='color:yellow'>KEY</span> on <span style='color:orange'>DOOR</span>' UNLOCKS the <span style='color:orange'>DOOR</span>." + "</br>";
            }
            else if (CurrentFloor == 2&&playerItems.sword == true) {
              TextBoard.innerHTML += "You have a <span style='color:#777'>SWORD</span> you can DESTROY <span style='color:orange'>DOORS</span> in one <span style='color:green'>ATTACK</span>!" + "</br>";
            }
            else if (roomItems[CurrentFloor].monster1 == true) {
              TextBoard.innerHTML += "<span style='color:#a00'> MONSTERS</span> have more than 1 HEALTH." + "</br>";
            }
            else if (CurrentFloor == 4) {
              TextBoard.innerHTML += "<span style='color:green'>LOOKS</span> like the <span style='color:#a30'>ALTAR</span> may be the only way out." + "</br>";
            }
            else if(roomItems[CurrentFloor].key==0 && playerItems.key == 0){
              TextBoard.innerHTML += "Remeber <span style='color:green'>USING</span> a <span style='color:yellow'>KEY</span> is not the only way to UNLOCK a DOOR." + "</br>";
            }
            else{
              TextBoard.innerHTML += "Remeber your goal is to escape." + "</br>";
            }
          }
        PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
        PlayerPotions.innerHTML = "POTIONS: " + PlayerPotionsInt;
    } else if (data[0] == "restart") {
        location.reload();
    } else {
        TextBoard.innerHTML += "You try to " + data[0] + " very hard but cannot.</br>";
    }
    if (PlayerHealthInt == 0) {
        TextBoard.innerHTML += "<span style='color:#a00'>You have DIED. Type RESTART to restart.</span>" + "</br>";
        IsDead = true;
    } else if (data[0] == "restart") {
        location.reload();
    }
}

function victory() {
    TextBoard.innerHTML += "You can see light!" + "</br>";
    TextBoard.innerHTML += "You are OUTSIDE!" + "</br>";
    TextBoard.innerHTML += "<span style='color:gold'> GOOD ENDING </span>" + "</br>";
}
function GoToNextRoom() {
    CurrentFloor += 1;
    TextBoard.innerHTML += roomItems[CurrentFloor].desc;
}
