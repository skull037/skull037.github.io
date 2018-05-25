var osc = new p5.Oscillator()
var backgroundColor = '#ffe5ff'
osc.setType('sine')
osc.amp(0)
var started = false;
var scoreInt = 0;
var xVal = 70
var noteSpeed
var gradingText = "START"
var songText= ""
var song = []
var noteFeq = [220, 246, 261, 293, 329, 349, 392]
var noteRects = [{
    x: xVal * 0.5,
    y: 100,
    letter: "A"
}, {
    x: xVal * 1.5,
    y: 100,
    letter: "B"
}, {
    x: xVal * 2.5,
    y: 100,
    letter: "C"
}, {
    x: xVal * 3.5,
    y: 100,
    letter: "D"
}, {
    x: xVal * 4.5,
    y: 100,
    letter: "E"
}, {
    x: xVal * 5.5,
    y: 100,
    letter: "F"
}, {
    x: xVal * 6.5,
    y: 100,
    letter: "G"
}]

function addSong() {
    var index = 400
    for (var i = 0; i < song[0].length; i++) {
        if (song[0][i].note == "G") {
            song[0][i].y = index
            song[0][i].x = xVal * 6.85
        } else if (song[0][i].note == "F") {
            song[0][i].y = index
            song[0][i].x = xVal * 5.85
        } else if (song[0][i].note == "E") {
            song[0][i].y = index
            song[0][i].x = xVal * 4.85
        } else if (song[0][i].note == "D") {
            song[0][i].y = index
            song[0][i].x = xVal * 3.85
        } else if (song[0][i].note == "C") {
            song[0][i].y = index
            song[0][i].x = xVal * 2.85
        } else if (song[0][i].note == "B") {
            song[0][i].y = index
            song[0][i].x = xVal * 1.85
        } else if (song[0][i].note == "A") {
            song[0][i].y = index
            song[0][i].x = xVal * 0.85
        }else if (song[0][i].note == "-") {
            song[0][i].y = index
            song[0][i].x = -100
        }
        index += 50;
    }
}

function setup() {
    var canvas = createCanvas(600, 400)
    canvas.parent("sketch-holder")
    osc.start()
}

function mousePressed() {
    if (collidePointRect(mouseX, mouseY, 100, 88, 132, 16)) {
      addSongToArray("mary")
      songText ="Mary Had a Little Lamp"
        started = true;
    }else if(collidePointRect(mouseX, mouseY, 290, 88, 110, 16)){
      addSongToArray("sandstorm")
      songText ="Darude Sandstorm"
      started = true
    }
}

function draw() {
    background(backgroundColor)
    fill("red")
    fill("black")
    if (started == false) {
        text("Mary Had a Little Lamb", 100, 100)
        text("Darude Sandstorm", 300, 100)
    } else {
        text("score: " + scoreInt, 500, 50)
        text(songText, 250, 25)
        text(gradingText, 270, 50)
        for (var i = 0; i < noteRects.length; i++) {
            fill("white")
            rect(noteRects[i].x, noteRects[i].y, 50, 50)
            fill("black")
            text(noteRects[i].letter, noteRects[i].x + 21, noteRects[i].y + 32)

        }
        for (var i = 0; i < song[0].length; i++) {
            fill("blue")
            song[0][i].y -= noteSpeed
            ellipse(song[0][i].x, song[0][i].y, 50, 50);
            if(song[0][i].y <99){
              gradingText = "LATE"
              scoreFun(-50)
            }
        }
    }
    // draws each rectangle
}

function keyPressed() {

    // allows audio to play
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
    if (keyCode == 90) {
        notePlayAndCheck(0, "A")
    } else if (keyCode == 88) {
        notePlayAndCheck(1, "B")
    } else if (keyCode == 67) {
        notePlayAndCheck(2, "C")
    } else if (keyCode == 86) {
        notePlayAndCheck(3, "D")
    } else if (keyCode == 66) {
        notePlayAndCheck(4, "E")
    } else if (keyCode == 78) {
        notePlayAndCheck(5, "F")
    } else if (keyCode == 77) {
        notePlayAndCheck(6, "G")
    }
    //if
}

function notePlayAndCheck(index, note) {
    playNote(noteFeq[index])
    if (note == song[0][0].note) {
        if (song[0][0].y < 150 && song[0][0].y > 125) {
            gradingText = "OKAY"
            scoreFun(75)
        } else if (song[0][0].y < 125 && song[0][0].y > 100) {
            gradingText = "GOOD"
            scoreFun(100)
        } else if (song[0][0].y > 150) {
            gradingText = "EARLY"
            scoreFun(-50)
        } else if (song[0][0].y < 100) {
            gradingText = "LATE"
            scoreFun(-50)
        }
    } else {
        gradingText = "WRONG"
        scoreFun(-100)
    }
}

function keyReleased() {
    osc.fade(0, 0.2)
}

function playNote(note, duration) {
    osc.freq(note) // sets frequency for note

    osc.fade(0.5, 0.2) // Fades the note in

    // If we set a duration, fade it out
    if (duration) {
        setTimeout(function() {
            osc.fade(0, 0, .2)
        }, duration - 50)
    }
}

function scoreFun(int) {
    scoreInt += int
    song[0].shift()
}
function addSongToArray(songToAdd){
  if(songToAdd == "mary"){
    noteSpeed=1.5
  song[0] =[{
      note: "E"
  }, {
      note: "D"
  }, {
      note: "C"
  }, {
      note: "E"
  }, {
      note: "E"
  }, {
      note: "E"
  }, {
      note: "D"
  }, {
      note: "D"
  }, {
      note: "D"
  }, {
      note: "E"
  }, {
      note: "G"
  }, {
      note: "G"
  }, {
      note: "E"
  }, {
      note: "D"
  }, {
      note: "C"
  }, {
      note: "D"
  }, {
      note: "E"
  }, {
      note: "E"
  }, {
      note: "E"
  }, {
      note: "E"
  }, {
      note: "D"
  }, {
      note: "D"
  }, {
      note: "E"
  }, {
      note: "D"
  }, {
      note: "C"
  }]
  addSong();
}else if(songToAdd == "sandstorm"){
  song[0] =[]
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("E",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("D",7)

  addRepeatedNotes("-",1)
  addRepeatedNotes("A",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)

  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)

  addRepeatedNotes("E",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("D",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("A",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)

  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)

  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("E",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("D",7)
  addRepeatedNotes("A",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)

  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("E",7)
  addRepeatedNotes("-",1)
  addRepeatedNotes("D",7)
  addRepeatedNotes("A",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)

  addRepeatedNotes("-",1)
  addRepeatedNotes("E",2)
  addRepeatedNotes("B",5)
  addRepeatedNotes("-",1)
  addRepeatedNotes("B",7)
  addRepeatedNotes("E",2)
  addRepeatedNotes("B",1)



  addSong();
  noteSpeed = 6
}
}
function addRepeatedNotes(noteString,num){
  for(var n=0;n<num;n++){
song[0][song[0].length]={note:(noteString)}
  }
}
