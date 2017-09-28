var Xturn = true;
var won = false;
var turnsTaken = 0;
addEvent();
function addEvent(){
    for(var i=1;i<10;i++){
        document.getElementById(i).addEventListener("click",function(e){
            if(e.target.type == undefined&&won == false){
                turnsTaken++
    if(Xturn == true){
        e.target.style.backgroundImage = "url('images/x.png')"
        Xturn = false;
        e.target.type = 1
    }else{
        e.target.style.backgroundImage = "url('images/o.png')"
        Xturn = true;
                e.target.type = 2
    }
    }
            checkIfWin(e,1)
            checkIfWin(e,2)
  })
 }
}
function checkIfWin(e,num){
if(document.getElementById("1").type == num&&document.getElementById("2").type == num&&document.getElementById("3").type == num
   ||document.getElementById("4").type == num&&document.getElementById("5").type == num&&document.getElementById("6").type == num      ||document.getElementById("1").type == num&&document.getElementById("5").type == num&&document.getElementById("9").type == num
  ||document.getElementById("7").type == num&&document.getElementById("8").type == num&&document.getElementById("9").type == num
  ||document.getElementById("1").type == num&&document.getElementById("4").type == num&&document.getElementById("7").type == num
  ||document.getElementById("2").type == num&&document.getElementById("5").type == num&&document.getElementById("8").type == num
  ||document.getElementById("3").type == num&&document.getElementById("6").type == num&&document.getElementById("9").type == num
  ||document.getElementById("3").type == num&&document.getElementById("5").type == num&&document.getElementById("7").type == num){
    if(num == 1){
        document.getElementById("winBox").textContent ="X WINS!"
        won = true;
    }else if(num == 2){
    document.getElementById("winBox").textContent ="O WINS!"
    won = true;
  }
    }
    else if(turnsTaken == 9){
        document.getElementById("winBox").textContent ="AN ETERNAL TIE!"
    won = true;
    }
}