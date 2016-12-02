//sets screens invisable
document.getElementById("gameover").style.visibility = "hidden";
document.getElementById("game").style.visibility = "hidden";
document.getElementById("paused").style.visibility = "hidden";
//randomizes the green apple
document.getElementById("BadApple").setAttribute("x", NumGen(75, 390));
document.getElementById("BadApple").setAttribute("y", NumGen(75, 160));
//puts high score
HighScoreA.textContent = "HIGHSCORE: " + localStorage.getItem('highScoreStored');
//player's location
var PlayerX = Number(document.getElementById("Player").getAttribute("x"));
var PlayerY = Number(document.getElementById("Player").getAttribute("y"));
//time at game start
var timeStart = Date.now()
    //food eaten which is the score and the score element and Health and its element
var FoodEaten = 0;
var ScoreText = document.getElementById("score");
var Health = 100;
var HealthText = document.getElementById("Health");
//apple & enemy speeds
var apple1Speed = 2;
var apple2Speed = 2;
var EnemySpeed = 10;
//checks if the game is active
var Gamebool = false;
//PlayerAnimation state 0 is idle
var PlayerAnimation = 0;
//score based on moves
var MoveScore = 0;
//health decrease spped
var difficulty = 150;
document.addEventListener("keydown", function(e) {
    //pause feature
    if (Gamebool == true && e.keyCode == 27) {
        Gamebool = false;
        document.getElementById("paused").style.visibility = "visible";
        document.getElementById("canvas").pauseAnimations();
    } else if (Gamebool == false && e.keyCode == 27) {
        Gamebool = true;
                document.getElementById("paused").style.visibility = "hidden";
        document.getElementById("canvas").unpauseAnimations();
    }
    if (Gamebool) {
        //apple's location
        var apple1X = Number(document.getElementById("apple1").getAttribute("x"));
        var apple1y = Number(document.getElementById("apple1").getAttribute("y"));
        var apple2X = Number(document.getElementById("apple2").getAttribute("x"));
        var apple2y = Number(document.getElementById("apple2").getAttribute("y"));
        //Enemy's location
        var EnemyX = Number(document.getElementById("Enemy").getAttribute("x"));
        var EnemyY = Number(document.getElementById("Enemy").getAttribute("y"));
        //green apple's location
        var GappleX = Number(document.getElementById("BadApple").getAttribute("x"));
        var GappleY = Number(document.getElementById("BadApple").getAttribute("y"));
        if (e.keyCode == 37 || e.keyCode == 65) {
            PlayerX -= 10;
            document.getElementById("Player").setAttribute("x", PlayerX)
            PlayerMove();
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            PlayerX += 10;
            document.getElementById("Player").setAttribute("x", PlayerX)
            PlayerMove();
        }
        if (e.keyCode == 40 || e.keyCode == 83) {
            PlayerY += 10;
            document.getElementById("Player").setAttribute("y", PlayerY)
            PlayerMove();
        } else if (e.keyCode == 38 || e.keyCode == 87) {
            PlayerY -= 10;
            document.getElementById("Player").setAttribute("y", PlayerY)
            PlayerMove();
        }
        //moves player to other side of board if they go over
        if (PlayerX <= -15) {
            PlayerX = 385;
        } else if (PlayerX >= 385) {
            PlayerX = -15;
        }
        if (PlayerY <= -15) {
            PlayerY = 160;
        } else if (PlayerY >= 160) {
            PlayerY = -15;
        }
        //moves enemy to another y axis when it crosses the border
        if (EnemyX >= 375) {
            document.getElementById("Enemy").setAttribute("y", NumGen(0, 160));
        }
        //checks players location against apple's location
        if (PlayerX >= apple1X - 20 && PlayerX <= apple1X + 20 && PlayerY >= apple1y - 20 && PlayerY <= apple1y + 20) {
            apple1Speed *= 0.9;
            document.getElementById("apple1").setAttribute("x", NumGen(75, 390));
            document.getElementById("apple1").setAttribute("y", 0);
            document.getElementById("apple1Ani").setAttribute("dur", apple1Speed);
            EatApple();
        } else if (PlayerX >= apple2X - 20 && PlayerX <= apple2X + 20 && PlayerY >= apple2y - 20 && PlayerY <= apple2y + 20) {
            apple2Speed *= 0.9;
            document.getElementById("apple2").setAttribute("x", NumGen(75, 390));
            document.getElementById("apple2").setAttribute("y", 0);
            document.getElementById("apple2Ani").setAttribute("dur", apple2Speed);
            EatApple();
        }
        //checks if player hits the enemy
        if (PlayerX >= EnemyX - 15 && PlayerX <= EnemyX + 15 && PlayerY >= EnemyY - 15 && PlayerY <= EnemyY + 15) {
            document.getElementById("Player").setAttribute("xlink:href", "images/Enemy.gif")
            PlayerAnimation = 2;
            Health -= 20;
        }
        //checks if player hits the green apple
        if (PlayerX >= GappleX - 15 && PlayerX <= GappleX + 15 && PlayerY >= GappleY - 20 && PlayerY <= GappleY + 20) {
            document.getElementById("Player").setAttribute("xlink:href", "images/Enemy.gif")
            PlayerAnimation = 2;
            document.getElementById("BadApple").setAttribute("x", NumGen(75, 390));
            document.getElementById("BadApple").setAttribute("y", NumGen(75, 160));
            Health -= 10;
        }
        //gameover
        if (Health <= 0) {
            GameOver()
        }
    }
    score.textContent = "SCORE: " + (FoodEaten + MoveScore);
    //HighScore logic
    if ((FoodEaten + MoveScore) > localStorage.getItem('highScoreStored')) {
        localStorage.setItem('highScoreStored', (FoodEaten + MoveScore));
        HighScoreA.textContent = "NEW HIGHSCORE: " + (FoodEaten + MoveScore);
    } else {
      if(localStorage.getItem('highScoreStored') == null){
        HighScoreA.textContent = "HIGHSCORE: 0";
    }
    else{
      HighScoreA.textContent = "HIGHSCORE: " + localStorage.getItem('highScoreStored');
  }
  }
});

//random number generator
function NumGen(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function EatApple() {
    FoodEaten += 50
    score.textContent = "SCORE: " + (FoodEaten + MoveScore);
    Health += 10;
    //prevents overheal
    if (Health > 100) {
        Health = 100
    }
}

function PlayerMove() {
    if (PlayerAnimation != 1) {
        document.getElementById("Player").setAttribute("xlink:href", "images/Player.gif");
        PlayerAnimation = 1;
    }
    //Health--
    MoveScore++
}
//plays after player chooses a difficulty
function GameStart(Diff) {
  difficulty = Diff;
  document.getElementById("game").style.visibility = "visible";
  document.getElementById("gamemenu").style.visibility = "hidden";
  Gamebool = true;
  console.log(difficulty);
  timeStart = Date.now()
  setInterval(function() {
      if(Gamebool == true){
      Health--;
    }
      if (Health <= 0) {
          GameOver();
      }
  }, difficulty);
}
//plays when player dies
function GameOver() {
    var timeStop = Date.now()
    SurTime.textContent = "YOU SURVIVED FOR " + Math.round((timeStop - timeStart) / 1000) + " SECONDS";
    document.getElementById("game").style.visibility = "hidden";
    document.getElementById("gameover").style.visibility = "visible";
    gameoverscore.textContent = "FINAL SCORE: " + (FoodEaten + MoveScore);
    Gamebool = false;
    //HighScore logic
    if ((FoodEaten + MoveScore) > localStorage.getItem('highScoreStored')) {
        localStorage.setItem('highScoreStored', (FoodEaten + MoveScore));
        HighScore.textContent = "NEW HIGHSCORE: " + (FoodEaten + MoveScore);
    } else {
        HighScore.textContent = "HIGHSCORE: " + localStorage.getItem('highScoreStored');
    }
    Health = Infinity;
}
//function for the restart button
function Restart(){
  Health = 100;
  FoodEaten = 0;
  MoveScore = 0;
  apple1Speed = 2;
  apple2Speed = 2;
  document.getElementById("apple2Ani").setAttribute("dur", apple2Speed);
  document.getElementById("apple1Ani").setAttribute("dur", apple1Speed);
  document.getElementById("apple2").setAttribute("x", 50);
  document.getElementById("apple1").setAttribute("x", 300);
PlayerX = 175;
PlayerY = 20;
document.getElementById("Player").setAttribute("y", PlayerY)
document.getElementById("Player").setAttribute("x", PlayerX)
document.getElementById("Player").setAttribute("xlink:href", "images/Player.gif");
PlayerAnimation = 1;
  document.getElementById("game").style.visibility = "visible";
  document.getElementById("gameover").style.visibility = "hidden";
  Gamebool = true;
  timeStart = Date.now()
}
//moves enemy after it finsihes its move animation
setInterval(function() {
  if(Gamebool == true){
    document.getElementById("Enemy").setAttribute("y", PlayerY)
  }
}, 5000);
//updates health text
setInterval(function() {
    HealthText.textContent = "Health:" + Health;

}, 10);
