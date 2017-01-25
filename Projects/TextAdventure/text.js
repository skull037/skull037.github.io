var TextBoard = document.getElementById("TextBoard");
var PlayerKeys = document.getElementById("playerKeys");
var PlayerKeysInt = 0;
var PlayerHealthInt = 10;
var PlayerHealth = document.getElementById("playerHealth");
var PlayerSword = document.getElementById("playerSword");
var CurrentFloor = 0;
//room info
var roomItems=[
room1Items={
  key:1,
  sword:0,
  door1: true,
  monster1: false,
  door:{
    isLocked:true,
    health: 3
  },
  walls: true,
  floor: true
},
room2Items={
  desc:("You GO TO the next room." + "</br> The WALLS and FLOOR are made of stone. There is a KEY on the floor."+ "</br> There is a MONSTER in the room."+ "</br>"+"There is a DOOR behind the MONSTER."),
  key:1,
  sword:0,
  door1: true,
  door:{
    isLocked:true,
    health: 3
  },
  monster1: true,
  monster:{
    health: 3
  },
  walls: true,
  floor: true
},
room3Items={
  desc:("You GO TO the next room." + "</br> The WALLS and FLOOR are made of stone. There is a SWORD on the floor."+ "</br>"+"There is a DOOR in front of you."),
  key:0,
  sword:1,
  door1: true,
  door:{
    isLocked:true,
    health: 3
  },
  monster1: false,
  walls: true,
  floor: true
},
roomvoidItems={
  desc:("All you can see is DARKNESS. You feel like you are not supposed to be here."+ "</br>"),
  key:0,
  sword:0,
  door1: false,
  door:{
    isLocked:true,
    health: 300
  },
  monster1: false,
  monster:{
    health: 300
  },
  walls: false,
  floor: false
}
];
//player items
var playerItems={
  key:0,
  sword:false
};
Start();

function Start(){
TextBoard.innerHTML +=("You awaken in a dark room." + "</br>");
TextBoard.innerHTML +=("The WALLS and FLOOR are made of stone. There is a KEY on the floor."+ "</br>");
TextBoard.innerHTML +=("There is a DOOR in font of you."+ "</br>");
}
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
      var textInput = document.getElementById("textInput").value;
      textInput = textInput.toLowerCase();
      commands(textInput);
      document.getElementById("textInput").value = "";
    }
})
function commands(data){
 data = data.split(" ");
 if(data[1] == "at"){
   data[1] = data[2];
 }
 else if(data[1] == "the"){
   data[1] = data[2];
 }
 if(data[2] == "with"||data[2] == "on"){
   data[2] = data[3];
 }
 //trying to take things
 if (data[0] == "take"||data[0] == "get"){
   if(data[1] == "key"&& roomItems[CurrentFloor].key > 0){
     TextBoard.innerHTML += "You TOOK a KEY."+"</br>";
     roomItems[CurrentFloor].key -= 1;
     PlayerKeysInt+=1;
     PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt
     playerItems.key +=1;
   }
      else if(data[1] == "key"&& roomItems[CurrentFloor].key == 0){
            TextBoard.innerHTML += "You cannot find a KEY."+"</br>";
      }
      else if(data[1] == "walls"&& roomItems[CurrentFloor].walls == true||data[1] == "wall"&& roomItems[CurrentFloor].walls == true){
            TextBoard.innerHTML += "You try to TAKE the WALLS but they won't budge."+"</br>";
      }
      else if(data[1] == "floor"&& roomItems[CurrentFloor].floor == true){
            TextBoard.innerHTML += "You try to TAKE the FLOOR but to no avail."+"</br>";
      }
      else if(data[1] == "sword"&& roomItems[CurrentFloor].sword>0){
            TextBoard.innerHTML += "You TOOK the SWORD. It shines brightly.</br>";
            playerItems.sword = true;
            roomItems[CurrentFloor].sword -= 1;
            PlayerSword.html = "SWORD: TRUE";
      }
      else if(data[1] == "sword"&& roomItems[CurrentFloor].sword == 0){
            TextBoard.innerHTML += "You cannot find a SWORD."+"</br>";
      }
      else if(data[1] == "door"&& roomItems[CurrentFloor].door1 == true){
            TextBoard.innerHTML += "You try to TAKE the DOOR but to no avail. It is LOCKED. Must be some other way to OPEN it."+"</br>";
      }
   else{
           TextBoard.innerHTML += "You tried to TAKE a "+data[1]+" but couldn't find one. Try something else."+"</br>";
   }
 }
 //trying to look at things
 else if(data[0] == "look"){
      TextBoard.innerHTML += "You LOOK";
      if(data[1] == "walls"&& roomItems[CurrentFloor].walls == true||data[1] == "wall"&& roomItems[CurrentFloor].walls == true){
        TextBoard.innerHTML += " at the WALLS. The WALLS are old, cracked, and made of stone."+"</br>";
      }
      else if(data[1] == "floor"&& roomItems[CurrentFloor].floor == true&&roomItems[CurrentFloor].key >0){
        TextBoard.innerHTML += " at the FLOOR. The FLOOR is old, cracked, and made of stone. There is a KEY on the FLOOR."+"</br>";
      }
      else if(data[1] == "floor"&& roomItems[CurrentFloor].floor == true&&roomItems[CurrentFloor].sword >0){
        TextBoard.innerHTML += " at the FLOOR. The FLOOR is old, cracked, and made of stone. There is a SWORD on the FLOOR."+"</br>";
      }
      else if(data[1] == "floor"&& roomItems[CurrentFloor].floor == true){
        TextBoard.innerHTML += " at the FLOOR. The FLOOR is old, cracked, and made of stone."+"</br>";
      }
      else if(data[1] == "key" && roomItems[CurrentFloor].key > 0 || data[1] == "key" && playerItems.key > 0){
        TextBoard.innerHTML += " at the KEY. It is old, scratched, and made of a silver metal. You can TAKE it."+"</br>";
      }
      else if(data[1] == "door"&& roomItems[CurrentFloor].door1 == true){
        TextBoard.innerHTML += " at the DOOR. The DOOR is old, scratched, and made of wood. You might be able to ATTACK it or use a KEY."+"</br>";
      }
      else if(data[1] == "monster"&& roomItems[CurrentFloor].monster1 == false){
        TextBoard.innerHTML += " the Monster. But there isn't one in this room. Other than you."+"</br>";
      }
      else if(data[1] == "monster"&& roomItems[CurrentFloor].monster1 == true){
        TextBoard.innerHTML += " the Monster. It is big, strong, and green. It can ATTACK."+"</br>";
      }
      else if(data[1] == undefined||data[1] == null){
        TextBoard.innerHTML += " at something but couldn't. Try 'LOOK at WALLS'."+"</br>";
      }
      else{
              TextBoard.innerHTML += " at "+data[1]+" but couldn't find it. Try something else."+"</br>";
      }

 }
 //trying to attack things
  else if(data[0] == "attack"){
        TextBoard.innerHTML += "You ATTACK";
    if(data[1] == "door"&& roomItems[CurrentFloor].door1 == true && playerItems.sword == false){
      TextBoard.innerHTML += " the DOOR with punches and kicks. The DOOR takes 1 DAMAGE. You 1 damage f torom ATTACKING without a SWORD."+"</br>";
      PlayerHealthInt -= 1;
      roomItems[CurrentFloor].door.health -=1;
           PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
           if(roomItems[CurrentFloor].door.health == 0){
             roomItems[CurrentFloor].door.isLocked = false;
             roomItems[CurrentFloor].door1 = false;
             if(CurrentFloor == 0){
             TextBoard.innerHTML += "You destroyed the DOOR! Now you can 'GO TO DOOR' it."+"</br>";
           }
           else{
                          TextBoard.innerHTML += "You destroyed the DOOR!"+"</br>";
           }
           }
    }
    else if(data[1] == "door"&& roomItems[CurrentFloor].door1 == true && playerItems.sword == true){
      TextBoard.innerHTML += " the DOOR with your SWORD. The DOOR takes 3 DAMAGE."+"</br>";
      roomItems[CurrentFloor].door.health -=3;
      if(roomItems[CurrentFloor].door.health == 0){
        roomItems[CurrentFloor].door.isLocked = false;
        roomItems[CurrentFloor].door1 = false;
        TextBoard.innerHTML += "You destroyed the DOOR!"+"</br>";
      }
    }
    else if(data[1] == "walls" && roomItems[CurrentFloor].walls == true||data[1] == "wall"&& roomItems[CurrentFloor].walls == true){
      TextBoard.innerHTML += " the WALLS with a fury of blows. The WALLS take no DAMAGE."+"</br>";
    }
    else if(data[1] == "floor" && roomItems[CurrentFloor].floor == true){
      TextBoard.innerHTML += " the FLOOR with many kicks. The FLOOR takes no DAMAGE."+"</br>";
    }
    else if(data[1] == "key" && roomItems[CurrentFloor].key > 0){
      TextBoard.innerHTML += " the KEY. The KEY BREAKS. You'll have to find another way out."+"</br>";
      roomItems[CurrentFloor].key -=1;
    }
    else if(data[1] == "monster" && roomItems[CurrentFloor].monster1 == false){
      TextBoard.innerHTML += " the Monster. But there isn't one in this room. Other than you."+"</br>";
    }
    else if(data[1] == "monster" && roomItems[CurrentFloor].monster1 == true){
      TextBoard.innerHTML += " the Monster. 1 DAMAGE DEALT. The MONSTER ATTACKS for 2 DAMAGE"+"</br>";
      PlayerHealthInt -= 2;
      roomItems[CurrentFloor].monster.health -=1;
           PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
           if(roomItems[CurrentFloor].monster.health == 0){
             roomItems[CurrentFloor].monster1 = false;
             TextBoard.innerHTML += "You killed the MONSTER!"+"</br>";
           }
    }
    else{
            TextBoard.innerHTML += " a "+data[1]+" but that doesn't exist. Try something else."+"</br>";
    }
  }
  //trying to use two items
    else if(data[0] == "use"){
      if(data[4]=="wall"){
        data[4]="walls"
      }
      if(data[1] == "key"&&data[2] == "door"&&roomItems[CurrentFloor].door1 == true &&playerItems.key > 0){
        if(CurrentFloor == 0){
              TextBoard.innerHTML += "You USED the KEY on the DOOR. The DOOR UNLOCKS! The KEY breaks. Now you can 'GO TO DOOR'."+"</br>";
}
else{
  TextBoard.innerHTML += "You USED the KEY on the DOOR. The DOOR UNLOCKS! The KEY breaks."+"</br>";
}
              playerItems.key -= 1;
              PlayerKeysInt -= 1;
              roomItems[CurrentFloor].door.isLocked = false;
              PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt;
      }
      else if(data[1] == "key"&&data[2] == "walls"&&roomItems[CurrentFloor].walls == true &&playerItems.key > 0||data[1] == "key"&&data[2] == "wall"&&roomItems[CurrentFloor].walls == true &&playerItems.key > 0){
              TextBoard.innerHTML += "You USED the KEY on the WALLS. You spend 3 HOURS trying to find a KEY HOLE. The KEY seems more DENTED than before."+"</br>";
      }
      else if(data[1] == "key"&&data[2] == "floor"&&roomItems[CurrentFloor].floor == true &&playerItems.key > 0){
              TextBoard.innerHTML += "You USED the KEY on the FLOOR. Nothing happens!"+"</br>";
      }
      else if(data[1] == "key"&&data[2] == "monster"&&roomItems[CurrentFloor].monster1 == true &&playerItems.key > 0){
              TextBoard.innerHTML += "You USED the KEY on the MONSTER. The MONSTER seems ANNOYED. It ATTACKS you for 2 DAMAGE."+"</br>";
              PlayerHealthInt -= 2;
              PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
      }
      else if(data[1] == "key"&&data[2] == "me"&&playerItems.key > 0||data[1] == "key"&&data[2] == "yourself"&&playerItems.key > 0||data[1] == "key"&&data[2] == "self"&&playerItems.key > 0){
              TextBoard.innerHTML += "You USED the KEY on YOURSELF. You UNLOCKED the SECRETS of the UNIVERSE. There is a small DENT from where you STABBED YOURSELF. Was it worth it?"+"</br>";
              TextBoard.innerHTML += "The WALLS, FLOOR, and EVERYTHING else DISAPPEARS!"+"</br>";
                            TextBoard.innerHTML += "You are FREE!"+"</br>";
              TextBoard.innerHTML += "JOKE ENDING"+"</br>";
              PlayerHealthInt -= 1;
                            PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
      }
      else if(data[1] == "key"&&playerItems.key == 0){
              TextBoard.innerHTML += "You don't have a KEY."+"</br>";
      }
      else{
              TextBoard.innerHTML += "You tried to USE "+data[1]+" on "+data[2]+" but couldn't."+"</br>";
      }
    }
    //go to place / item
    else if(data[0] == "go" &&data[1] == "to"){
        TextBoard.innerHTML += "You GO TO";
      if(data[2] == "door" && roomItems[CurrentFloor].door.isLocked == false){
        TextBoard.innerHTML += " the DOOR."+"</br>";
        GoToNextRoom();
      }
      else if(data[2] == "walls" && roomItems[CurrentFloor].walls == true){
        TextBoard.innerHTML += " the WALLS. You go back to the middle of the room."+"</br>";
      }
      else if(data[2] == "door" && roomItems[CurrentFloor].door.isLocked == true){
        TextBoard.innerHTML += " the DOOR. It is LOCKED. Try to find a way to UNLOCK it."+"</br>";
      }
      else if(data[2] == "floor" && roomItems[CurrentFloor].floor == true){
        TextBoard.innerHTML += " the FLOOR. You go back to the middle of the room."+"</br>";
      }
      else if(data[2] == "monster" && roomItems[CurrentFloor].monster1 == true){
        TextBoard.innerHTML += " the MONSTER. It ATTACKS you for 2 DAMAGE. You go back to the middle of the room."+"</br>";
        PlayerHealthInt -= 2;
        PlayerHealth.innerHTML = "HEALTH: " + PlayerHealthInt;
      }
      else if(data[2] == "monster" && roomItems[CurrentFloor].monster1 == false){
        TextBoard.innerHTML += " the MONSTER. You stay put."+"</br>";
      }
      else if(data[2] == "key" && roomItems[CurrentFloor].key > 0){
        TextBoard.innerHTML += " the KEY. You pick it up.'TAKE KEY' also works."+"</br>";
        roomItems[CurrentFloor].key -= 1;
        PlayerKeysInt+=1;
        PlayerKeys.innerHTML = "KEYS:" + PlayerKeysInt;
        playerItems.key +=1;
      }
      else{
                TextBoard.innerHTML +=  " "+data[2]+". You go back to the middle of the room."+"</br>";
      }
}
    else if(data[0] == "help"){
        TextBoard.innerHTML += "Look at the SIDEBAR on the RIGHT for HELP."+"</br>";
    }
    else if(data[0] == "restart"){
        location.reload();
    }
    else{
        TextBoard.innerHTML += "You try to "+data[0]+" very hard but cannot.</br>";
    }
}
function victory(){
          TextBoard.innerHTML += "You can see light!"+"</br>";
          TextBoard.innerHTML += "You are OUTSIDE!"+"</br>";
          TextBoard.innerHTML += "GOOD ENDING"+"</br>";
}
function GoToNextRoom(){
  CurrentFloor +=1;
  TextBoard.innerHTML +=roomItems[CurrentFloor].desc;
}
