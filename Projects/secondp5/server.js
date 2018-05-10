//>'д'<\\
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(path.join(__dirname, 'public')));
var players = [];
var time = 0;
var playerInt = 0;
var serverZeds = [];
var serverKills = 0;
var serverShots = [];
var diffOffset = 1000;
var serverReset = 10;
var diffOffsetFast = 5000;
var serverWave = 1;
var waveInProgress = true;
// Handle a new connection
io.on('connection', function(socket) {
    players[playerInt] = {
        x: 400,
        y: 300,
        speed: 2.5,
        shotTimer: 30,
        shotPen: 0,
        shotSpeed: 5,
        health: 1,
        kills: 0
    }
    playerInt++
    io.emit('join', players, serverWave)
    socket.on('update', function(pArray, sArray, zArray) {
        io.emit('update', pArray, sArray, zArray)
    })
    socket.on('updateplayer', function(playmove, playersArray) {
        if (playersArray[playmove] != undefined) {
            players[playmove] = playersArray[playmove]
        }
        io.emit('update', players, "", "")
    })
    socket.on('bullCollide', function(s, z, k) {
        serverShots = s;
        serverZeds = z;
        serverKills = k;
        io.emit('update', "", serverShots, serverZeds, serverKills)
    })
    socket.on('zedUpdate', function(clientZeds) {
        serverZeds = clientZeds;
        io.emit('update', "", "", serverZeds)
    })
    socket.on('updateShots', function(clientshots) {
        serverShots = clientshots;
        io.emit('update', "", serverShots, "")
    })
    socket.on('gameOver', function() {
        io.emit('gameOver')
    })
    socket.on('restart', function() {
        time = 0;
        serverZeds = []
        serverZeds.length = 0;
        serverShots = []
        serverKills = 0;
        waveInProgress = true;
        serverWave = 1;
        io.emit('localReset')
    })
    //end
});
setInterval(function() {
    if (serverZeds.length < 3 && waveInProgress == true) {
        for (var z = 0; z < 10; z++) {
            var tempX = 0;
            var tempY = 0;
            var xPicker = Math.floor((Math.random() * 4));
            if (xPicker == 0) {
                tempX = Math.floor((Math.random() * 800));
            } else if (xPicker == 1) {
                tempX = 0
                tempY = Math.floor((Math.random() * 600));
            } else if (xPicker == 2) {
                tempX = 800
                tempY = Math.floor((Math.random() * 600));
            } else {
                tempX = Math.floor((Math.random() * 800));
                tempY = Math.floor((Math.random() * 800) + 600);
            }
            serverZeds.push({
                x: tempX,
                y: tempY,
                color: "pink",
                type: "normal"
            })
            io.emit('update', "", "", serverZeds)
        }
    }
}, 250)
setInterval(function() {
    if (waveInProgress == true) {
        var tempX = 0;
        var tempY = 0;
        var xPicker = Math.floor((Math.random() * 4));
        if (xPicker == 0) {
            tempX = Math.floor((Math.random() * 800));
        } else if (xPicker == 1) {
            tempX = 0
            tempY = Math.floor((Math.random() * 600));
        } else if (xPicker == 2) {
            tempX = 800
            tempY = Math.floor((Math.random() * 600));
        } else {
            tempX = Math.floor((Math.random() * 800));
            tempY = 600;
        }
        serverZeds.push({
            x: tempX,
            y: tempY,
            color: "pink",
            type: "normal"
        })
        io.emit('update', "", "", serverZeds)
        //diffOffset -= 10
    }
}, (diffOffset))
setInterval(function() {
    if (waveInProgress == true) {
        var tempX = 0;
        var tempY = 0;
        var xPicker = Math.floor((Math.random() * 4));
        if (xPicker == 0) {
            tempX = Math.floor((Math.random() * 800));
        } else if (xPicker == 1) {
            tempX = 0
            tempY = Math.floor((Math.random() * 600));
        } else if (xPicker == 2) {
            tempX = 800
            tempY = Math.floor((Math.random() * 600));
        } else {
            tempX = Math.floor((Math.random() * 800));
            tempY = 600;
        }
        serverZeds.push({
            x: tempX,
            y: tempY,
            color: "orange",
            type: "fast"
        })
        io.emit('update', "", "", serverZeds)
        //diffOffsetFast -= 10
    }
}, (diffOffsetFast))

function removeArrayElement(array, index) {
    var element = array[index]
    if (element.parentNode) {
        element.parentNode.removeChild(element);
    }
    array.splice(index, 1)
}
setInterval(function() {
    time++
    if ((time / serverWave) == 30) {
        endCurrentWave();
    }

    //if ((time - (10) / serverWave) == 30) {
    if (time == 10 + (30 * serverWave)) {
        startCurrentWave();
    }
    io.emit('updateTime', time);
}, (1000));

http.listen(3000, function() {
    console.log('Listening on port 3000. Join when ready, or dont B A K A.');
});

function endCurrentWave() {
    waveInProgress = false;
    serverZeds = [];
    serverZeds.length = 0;
    io.emit('endWave', time)
    serverZeds = [];
    serverZeds.length = 0;
}

function startCurrentWave() {
    waveInProgress = true;
    serverWave++;
    io.emit('startWave', time)
}
