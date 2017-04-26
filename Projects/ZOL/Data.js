//>'д'<\\
//screen 11 = 5, 13 = 7
//dont forget array stuff

var backgroundArrayElements = []
var exits = []
var fireShooter = [];
var fireShooterBalls = [];
var pickups = []
var enemies = []
var background = "makeImage(backgroundArray[0].base, 0, 0, 800, 400)"
var invul = 60;
var smoke = ""
var skeletonBossDead = false;
var knightBossDead = false;
var moneyIcon = "";
var barrier = [];
var shop = [];
var gameOver = false;
var gameOverRect = "";
var continueText = "";
var dun1Left = false;
var dun1Right = false;
var storeText = "";
var itemText = ""
var stocks=[];
var key=false
var keyDown;
var swordCool=0;
var attacked = false;
var levelText = ""
var totallyDone = false;
//audio
var playerAttackSound = new Audio("Sounds/Attack.wav");
var music = new Audio("Sounds/Overworld.mp3");
music.loop = true;
var playerHitSound = new Audio("Sounds/Hit.wav");
var backgroundArray = [{
    base: "Images/Screens/Screen1.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 1,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 46,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 19,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "red",
        opacity: 0.5,
        screenToLoad: -1,
        direction: "east"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Trees/TreeA.png"),
        x: 100,
        y: 200,
        width: 128,
        height: 128
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 632,
        y: 82,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 664,
        y: 114,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 632,
        y: 114,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 664,
        y: 82,
        width: 32,
        height: 32
    }, ],
    enemies: []
}, {
    base: "Images/Screens/Screen2.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 4,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 0,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 6,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 2,
        direction: "west"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Trees/TreeC.png"),
        x: 400,
        y: 82,
        width: 128,
        height: 128
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen3.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 3,
        direction: "north"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 1,
        direction: "east"
    }],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen4.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 2,
        direction: "south"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 182,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 332,
        y: 214,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 214,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 86,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 118,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 150,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 300,
        y: 150,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 460,
        y: 214,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 460,
        y: 86,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 460,
        y: 118,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 460,
        y: 150,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Trees/TreeB.png"),
        x: 332,
        y: 82,
        width: 128,
        height: 128
    }, ],
    enemies: []
}, {
    base: "Images/Screens/Screen5.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 1,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 5,
        direction: "east"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Trees/TreeC.png"),
        x: 400,
        y: 82,
        width: 128,
        height: 128
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen6.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 7,
        direction: "north"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 4,
        direction: "west"
    }],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 600,
        y: 300,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }, {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 400,
        y: 100,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }]
}, {
    base: "Images/Screens/Screen7.png",
    exits: [{
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 1,
        direction: "west"
    }],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 600,
        y: 100,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }, {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 200,
        y: 100,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }, {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 700,
        y: 200,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }, {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 300,
        y: 300,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }]
}, {
    base: "Images/Screens/Screen8.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 8,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 5,
        direction: "south"
    }],
    backgroundElements: [],
    enemies: [],
    fireShooter: [{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 712,
        y: 100,
        width: 32,
        height: 32,
        shootDir: "left"
    },{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 64,
        y: 300,
        width: 32,
        height: 32,
        shootDir: "right"
    }]
}, {
    base: "Images/Screens/Screen9.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 7,
        direction: "south"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 9,
        direction: "west"
    }],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen10.png",
    exits: [{
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 8,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 10,
        direction: "west"
    }, ],
    backgroundElements: [],
    fireShooter: [{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 64,
        y: 64,
        width: 32,
        height: 32,
        shootDir: "down"
    }, {
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 712,
        y: 308,
        width: 32,
        height: 32,
        shootDir: "up"
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen5.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 11,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 9,
        direction: "east"
    }],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/knight/knight.gif"),
        x: 100,
        y: 300,
        width: 32,
        height: 32,
        health: 3,
        speed: 1
    }, {
        url: ("Images/Characters/knight/knight.gif"),
        x: 700,
        y: 300,
        width: 32,
        height: 32,
        health: 3,
        speed: 1
    }]
}, {
    base: "Images/Screens/Screen12.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 10,
        direction: "north"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 12,
        direction: "east"
    }, ],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen7.png",
    exits: [{
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 11,
        direction: "west"
    }, {
        url: "Images/BackgroundElements/DungeonEnt/ForestDungeon.png",
        x: 364,
        y: -16,
        width: 128,
        height: 64,
        screenToLoad: 13,
        direction: "north"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Pillars/PillarOld.png"),
        x: 364,
        y: 128,
        width: 32,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Pillars/PillarBroken2.png"),
        x: 364,
        y: 192,
        width: 32,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Pillars/PillarBroken1.png"),
        x: 364,
        width: 32,
        y: 256,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Pillars/PillarOld.png"),
        x: 450,
        y: 128,
        width: 32,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Pillars/PillarBroken2A.png"),
        x: 450,
        y: 192,
        width: 32,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Pillars/PillarBroken1.png"),
        x: 450,
        width: 32,
        y: 256,
        height: 64
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 700,
        y: 192,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 700,
        y: 224,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 700,
        y: 258,
        width: 32,
        height: 32
    }],
    enemies: [{
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 600,
        y: 100,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }, {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 700,
        y: 200,
        width: 32,
        height: 32,
        health: 1,
        speed: 1
    }]
}, {
    base: "Images/Screens/ScreenD11.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 14,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        screenToLoad: 12,
        opacity: 0.5,
        direction: "south"
    }, ],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Statue/knightStatue.png"),
        x: 250,
        y: 100,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Statue/knightStatue.png"),
        x: 500,
        y: 100,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Statue/knightStatue.png"),
        x: 250,
        y: 200,
        width: 32,
        height: 32
    }, {
        url: ("Images/BackgroundElements/Statue/knightStatue.png"),
        x: 500,
        y: 200,
        width: 32,
        height: 32
    }],
    enemies: []
}, {
    base: "Images/Screens/ScreenD12.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 17,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 13,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 15,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 16,
        direction: "west"
    }],
    backgroundElements: [],
    puzzle: [{
        url: ("Images/BackgroundElements/Puzzle/OrbOff.png"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        status: "off",
        type: "switch-EW",
        effects: 0,
        door: "north",
    }],
    barrier: [{
        url: ("Images/Screens/BarrierEast.png"),
        x: 0,
        y: 0,
        width: 800,
        height: 400,
        direction: "east",
        rect: {
            x: 750,
            y: 100,
            width: 50,
            height: 200,
            color: "white",
            opacity: 0.5,
            direction: "east"
        },
    }, {
        url: ("Images/Screens/BarrierNorth.png"),
        x: 0,
        y: 0,
        width: 800,
        height: 400,
        direction: "north",
        rect: {
            x: 250,
            y: 0,
            width: 300,
            height: 50,
            color: "white",
            opacity: 0.5,
            direction: "north"
        },
    }],
    enemies: []
}, {
    base: "Images/Screens/ScreenD13.png",
    exits: [{
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 14,
        direction: "west"
    }],
    backgroundElements: [],
    enemies: [],
    puzzle: [{
        url: ("Images/BackgroundElements/Puzzle/OrbOff.png"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        status: "off",
        type: "dun1Right",
        effects: 0,
        door: "north",
    }],
}, {
    base: "Images/Screens/ScreenD14.png",
    exits: [{
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 14,
        direction: "east"
    }],
    backgroundElements: [],
    enemies: [],
    puzzle: [{
        url: ("Images/BackgroundElements/Puzzle/OrbOff.png"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        status: "off",
        type: "dun1Left",
        effects: 0,
        door: "north",
    }]
}, {
    base: "Images/Screens/ScreenD11.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 18,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        screenToLoad: 14,
        opacity: 0.5,
        direction: "south"
    }],
    backgroundElements: [],
    enemies: [],
    fireShooter: [{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 64,
        y: 64,
        width: 32,
        height: 32,
        shootDir: "right"
    }, {
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 712,
        y: 308,
        width: 32,
        height: 32,
        shootDir: "left"
    }]
}, {
    base: "Images/Screens/ScreenD16.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        screenToLoad: 17,
        opacity: 0.5,
        direction: "south"
    }],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/Skeleton/SkeletonBoss.gif"),
        x: 600,
        y: 100,
        width: 96,
        height: 96,
        health: 5,
        speed: 2
    }],
    fireShooter: [{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 712,
        y: 200,
        width: 32,
        height: 32,
        shootDir: "left"
    }]
}, {
    base: "Images/Screens/Screen14.png",
    exits: [{
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 20,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 0,
        direction: "west"
    }, ],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 400,
        y: 100,
        width: 32,
        height: 32,
        health: 1,
        speed:1
    },{
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 464,
        y: 300,
        width: 32,
        height: 32,
        health: 1,
        speed:1
    }]
}, {
    base: "Images/Screens/Screen15.png",
    exits: [{
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 21,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 19,
        direction: "west"
    }, ],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus1.png"),
        x: 600,
        y: 100,
        width: 32,
        height: 32
    }],
    enemies: [{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    },{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 300,
        y: 100,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    }]
}, {
    base: "Images/Screens/Screen16.png",
    exits: [{
        x: 250,
        y: -25,
        height: 50,
        width: 300,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 22,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 23,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 25,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 20,
        direction: "west"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus4.png"),
        x: 164,
        y: 128,
        width: 32,
        height: 32
    }],fireShooter: [{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 64,
        y: 64,
        width: 32,
        height: 32,
        shootDir: "right"
    }],
    enemies: [{
        url: ("Images/Characters/knight/knight.gif"),
        x: 600,
        y: 100,
        width: 32,
        height: 32,
        health: 3,
        speed:1
    },{
        url: ("Images/Characters/knight/knight.gif"),
        x: 664,
        y: 300,
        width: 32,
        height: 32,
        health: 3,
        speed:1
    }]
}, {
    base: "Images/Screens/Screen17.png",
    exits: [{
        x: 250,
        y: -25,
        height: 50,
        width: 300,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 33,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 21,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 24,
        direction: "east"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus1.png"),
        x: 164,
        y: 128,
        width: 32,
        height: 32
    },{
        url: ("Images/BackgroundElements/Grass/Grass2.png"),
        x: 632,
        y: 82,
        width: 32,
        height: 32
    },{
        url: ("Images/BackgroundElements/Grass/Grass2.png"),
        x: 600,
        y: 82,
        width: 32,
        height: 32
    },{
        url: ("Images/BackgroundElements/Grass/Grass2.png"),
        x: 632,
        y: 114,
        width: 32,
        height: 32
    },{
        url: ("Images/BackgroundElements/Grass/Grass2.png"),
        x: 600,
        y: 114,
        width: 32,
        height: 32
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen18.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 21,
        direction: "north"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 26,
        direction: "east"
    }, ],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen19.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 25,
        direction: "south"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 22,
        direction: "west"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus1.png"),
        x: 600,
        y: 300,
        width: 32,
        height: 32
    }],
    enemies: [{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    },{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 500,
        y: 100,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    }]
}, {
    base: "Images/Screens/Screen16.png",
    exits: [{
        x: 250,
        y: -25,
        height: 50,
        width: 300,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 24,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 26,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 28,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 21,
        direction: "west"
    }],
    fireShooter:[{
        url: ("Images/Characters/fireShooter/fireShooter.gif"),
        x: 64,
        y: 308,
        width: 32,
        height: 32,
        shootDir: "right"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus2.png"),
        x: 164,
        y: 128,
        width: 32,
        height: 32
    }],
    enemies: [{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    }]
}, {
    base: "Images/Screens/Screen21.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 25,
        direction: "north"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 23,
        direction: "west"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus3.png"),
        x: 200,
        y: 300,
        width: 32,
        height: 32
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen22.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 28,
        direction: "south"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus1.png"),
        x: 600,
        y: 300,
        width: 32,
        height: 32
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen16.png",
    exits: [{
        x: 250,
        y: -25,
        height: 50,
        width: 300,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 27,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 29,
        direction: "south"
    }, {
        x: 775,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 31,
        direction: "east"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 25,
        direction: "west"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus3.png"),
        x: 164,
        y: 128,
        width: 32,
        height: 32
    }],
    enemies: []
}, {
    base: "Images/Screens/Screen24.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 28,
        direction: "north"
    }],
    backgroundElements: [{
        url: ("Images/BackgroundElements/Cactus/Cactus2.png"),
        x: 600,
        y: 300,
        width: 32,
        height: 32
    }],
    enemies: [{
        url: ("Images/Characters/Fire/FireEnemy.gif"),
        x: 400,
        y: 200,
        width: 32,
        height: 32,
        health: 2,
        speed:2
    }]
}, {
    base: "Images/Screens/Screen22.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 31,
        direction: "south"
    }],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen26.png",
    exits: [{
        x: 250,
        y: -25,
        height: 50,
        width: 300,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 30,
        direction: "north"
    }, {
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 32,
        direction: "south"
    }, {
        x: -25,
        y: 100,
        width: 50,
        height: 200,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 28,
        direction: "west"
    },{
        url: "Images/BackgroundElements/DungeonEnt/DesertDungeon.png",
        x: 600,
        y: 175,
        width: 64,
        height: 64,
        screenToLoad: 34,
        direction: "east"
    }],
    backgroundElements: [],
    enemies: [{
        url: ("Images/Characters/knight/knight.gif"),
        x: 500,
        y: 200,
        width: 64,
        height: 64,
        health: 6,
        speed:1
    }]
}, {
    base: "Images/Screens/Screen24.png",
    exits: [{
        x: 250,
        y: -25,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 31,
        direction: "north"
    }],
    backgroundElements: [],
    enemies: []
}, {
    base: "Images/Screens/Screen22.png",
    exits: [{
        x: 250,
        y: 375,
        width: 300,
        height: 50,
        color: "cyan",
        opacity: 0.5,
        screenToLoad: 22,
        direction: "south"
    }],
    backgroundElements: [{
        url: ("Images/Characters/ShopKeep.png"),
        x: 400,
        y: 96,
        width: 32,
        height: 32
    }],
    enemies: [],
    shop: [{
        url: ("Images/Items/HeartPickUp.png"),
        x: 200,
        y: 200,
        width: 32,
        height: 32,
        price: 20,
        text: "Heart",
        stock: 999
    }, {
        url: ("Images/Heart.png"),
        x: 600,
        y: 200,
        width: 32,
        height: 32,
        price: 50,
        text: "Heart Container",
        stock: 1
    }]
  },{
      base: "Images/Screens/Screen35.png",
      exits: [{
          x: 775,
          y: 100,
          width: 50,
          height: 200,
          color: "cyan",
          opacity: 0.5,
          screenToLoad: 36,
          direction: "east"
      }, {
          x: -25,
          y: 100,
          width: 50,
          height: 200,
          color: "cyan",
          opacity: 0.5,
          screenToLoad: 31,
          direction: "west"
      }],
      backgroundElements: [{
          url: ("Images/BackgroundElements/Statue/knightStatue.png"),
          x: 250,
          y: 100,
          width: 32,
          height: 32
      }, {
          url: ("Images/BackgroundElements/Statue/knightStatue.png"),
          x: 500,
          y: 100,
          width: 32,
          height: 32
      }, {
          url: ("Images/BackgroundElements/Statue/knightStatue.png"),
          x: 250,
          y: 300,
          width: 32,
          height: 32
      }, {
          url: ("Images/BackgroundElements/Statue/knightStatue.png"),
          x: 500,
          y: 300,
          width: 32,
          height: 32
      }],
      enemies: []
  },{
      base: "Images/Screens/Screen22.png",
      exits: [{
          x: 250,
          y: 375,
          width: 300,
          height: 50,
          color: "cyan",
          opacity: 0.5,
          screenToLoad: 31,
          direction: "south"
      }],
      backgroundElements: [],
      enemies: []
  }, {
      base: "Images/Screens/ScreenD36.png",
      exits: [{
          x: 250,
          y: -25,
          height: 50,
          width: 300,
          color: "cyan",
          opacity: 0.5,
          screenToLoad: 37,
          direction: "north"
      },{
          x: -25,
          y: 100,
          width: 50,
          height: 200,
          color: "cyan",
          opacity: 0.5,
          screenToLoad: 34,
          direction: "west"
      }],
      backgroundElements: [{
          url: ("Images/BackgroundElements/Statue/knightStatue.png"),
          x: 250,
          y: 100,
          width: 32,
          height: 32
      }],
      enemies: []
    },{
        base: "Images/Screens/Screen37.png",
        exits: [{
            x: 250,
            y: 375,
            width: 300,
            height: 50,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 36,
            direction: "south"
        }, {
            x: -25,
            y: 100,
            width: 50,
            height: 200,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 38,
            direction: "west"
        }],
        backgroundElements: [],
        fireShooter: [],
        enemies: [    {
                url: ("Images/Characters/knight/knight.gif"),
                x: 600,
                y: 300,
                width: 32,
                height: 32,
                health: 3,
                speed:1
            },    {
                    url: ("Images/Characters/knight/knight.gif"),
                    x: 600,
                    y: 300,
                    width: 32,
                    height: 32,
                    health: 3,
                    speed:1
                }]
    },{
        base: "Images/Screens/Screen38.png",
        exits: [{
            x: 250,
            y: 375,
            width: 300,
            height: 50,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 39,
            direction: "south"
        }, {
            x: 775,
            y: 100,
            width: 50,
            height: 200,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 37,
            direction: "east"
        }],
        backgroundElements: [],fireShooter: [],
        enemies: [    {
                url: ("Images/Characters/knight/knight.gif"),
                x: 600,
                y: 300,
                width: 32,
                height: 32,
                health: 3,
                speed:1
            },    {
                    url: ("Images/Characters/knight/knight.gif"),
                    x: 600,
                    y: 300,
                    width: 32,
                    height: 32,
                    health: 3,
                    speed:1
                }]
    },{
        base: "Images/Screens/Screen39.png",
        exits: [{
            x: 250,
            y: -25,
            height: 50,
            width: 300,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 38,
            direction: "north"
        },{
            x: 775,
            y: 100,
            width: 50,
            height: 200,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 45,
            direction: "east"
        }],
        backgroundElements: [{
            url: ("Images/BackgroundElements/Statue/knightStatue.png"),
            x: 250,
            y: 100,
            width: 32,
            height: 32
        }],fireShooter: [],
        enemies: []
    },{
        base: "Images/Screens/ScreenD36.png",
        exits: [{
            x: 250,
            y: -25,
            height: 50,
            width: 300,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 41,
            direction: "north"
        },{
            x: -25,
            y: 100,
            width: 50,
            height: 200,
            color: "cyan",
            opacity: 0.5,
            screenToLoad: 39,
            direction: "west"
        }],
        backgroundElements: [{
            url: ("Images/BackgroundElements/Statue/knightStatue.png"),
            x: 250,
            y: 100,
            width: 32,
            height: 32
        }],
        enemies: []
      },{
          base: "Images/Screens/Screen37.png",
          exits: [{
              x: 250,
              y: 375,
              width: 300,
              height: 50,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 40,
              direction: "south"
          }, {
              x: -25,
              y: 100,
              width: 50,
              height: 200,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 42,
              direction: "west"
          }],
          backgroundElements: [],
          fireShooter: [],
          enemies: [    {
                  url: ("Images/Characters/knight/knight.gif"),
                  x: 600,
                  y: 300,
                  width: 32,
                  height: 32,
                  health: 3,
                  speed:1
              }]
      },{
          base: "Images/Screens/Screen38.png",
          exits: [{
              x: 250,
              y: 375,
              width: 300,
              height: 50,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 43,
              direction: "south"
          }, {
              x: 775,
              y: 100,
              width: 50,
              height: 200,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 41,
              direction: "east"
          }],
          backgroundElements: [],fireShooter: [],
          enemies: [    {
                  url: ("Images/Characters/knight/knight.gif"),
                  x: 600,
                  y: 300,
                  width: 32,
                  height: 32,
                  health: 3,
                  speed:1
              },    {
                      url: ("Images/Characters/knight/knight.gif"),
                      x: 600,
                      y: 300,
                      width: 32,
                      height: 32,
                      health: 3,
                      speed:1
                  }]
      },{
          base: "Images/Screens/Screen39.png",
          exits: [{
              x: 250,
              y: -25,
              height: 50,
              width: 300,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 42,
              direction: "north"
          },{
              x: 775,
              y: 100,
              width: 50,
              height: 200,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 45,
              direction: "east"
          }],
          backgroundElements: [{
              url: ("Images/BackgroundElements/Statue/knightStatue.png"),
              x: 250,
              y: 100,
              width: 32,
              height: 32
          }],fireShooter: [],
          enemies: []
      },{
          base: "Images/Screens/Screen38.png",
          exits: [{
              x: 250,
              y: 375,
              width: 300,
              height: 50,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 43,
              direction: "south"
          }, {
              x: 775,
              y: 100,
              width: 50,
              height: 200,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 41,
              direction: "east"
          }],
          backgroundElements: [],fireShooter: [],
          enemies: [    {
                  url: ("Images/Characters/knight/knight.gif"),
                  x: 600,
                  y: 300,
                  width: 32,
                  height: 32,
                  health: 3,
                  speed:1
              }]
      },{
          base: "Images/Screens/ScreenD13.png",
          exits: [{
              x: -25,
              y: 100,
              width: 50,
              height: 200,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 43,
              direction: "west"
          }],
          backgroundElements: [],
          fireShooter: [],
          enemies: [  {
                url: ("Images/Characters/knight/BossKnight.gif"),
                x: 700,
                y: 200,
                width: 64,
                height: 64,
                health: 6,
                speed:1
            }]
      },{
          base: "Images/Screens/Screen46.png",
          exits: [{
              x: 250,
              y: -25,
              width: 300,
              height: 50,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 0,
              direction: "north"
          }, {
              x: 250,
              y: 375,
              width: 300,
              height: 50,
              color: "cyan",
              opacity: 0.5,
              screenToLoad: 47,
              direction: "south"
          }, {
            x: -25,
            y: 100,
              width: 50,
              height: 200,
              color: "red",
              opacity: 0.5,
              screenToLoad: -1,
              direction: "west"
          }],
          backgroundElements: [],
          enemies: []
        },{
            base: "Images/Screens/Screen47.png",
            exits: [{
                x: 250,
                y: -25,
                width: 300,
                height: 50,
                color: "cyan",
                opacity: 0.5,
                screenToLoad: 46,
                direction: "north"
            }, {
                x: 250,
                y: 375,
                width: 300,
                height: 50,
                color: "red",
                opacity: 0.5,
                screenToLoad: -1,
                direction: "south"
            },{
                x: 775,
                y: 100,
                width: 50,
                height: 200,
                color: "cyan",
                opacity: 0.5,
                screenToLoad: 48,
                direction: "east"
            }],
            backgroundElements: [],
            enemies: []
          },{
              base: "Images/Screens/Screen48.png",
              exits: [{
                  x: 250,
                  y: 375,
                  width: 300,
                  height: 50,
                  color: "red",
                  opacity: 0.5,
                  screenToLoad: 49,
                  direction: "south"
              },{
                  x: -25,
                  y: 100,
                  width: 50,
                  height: 200,
                  color: "cyan",
                  opacity: 0.5,
                  screenToLoad: 47,
                  direction: "west"
              }],
              backgroundElements: [],
              enemies: []
            },{
                base: "Images/Screens/Screen49.png",
                exits: [{
                    x: 250,
                    y: -25,
                    width: 300,
                    height: 50,
                    color: "cyan",
                    opacity: 0.5,
                    screenToLoad: 48,
                    direction: "north"
                }, {
                    x: 250,
                    y: 375,
                    width: 300,
                    height: 50,
                    color: "red",
                    opacity: 0.5,
                    screenToLoad: -1,
                    direction: "south"
                },{
                    x: 775,
                    y: 100,
                    width: 50,
                    height: 200,
                    color: "cyan",
                    opacity: 0.5,
                    screenToLoad: 48,
                    direction: "east"
                }],
                backgroundElements: [],
                enemies: []
              }]
var heartArray = [];
var background;
var player = {
    base: "URL",
    health: 3,
    maxHealth: 3,
    attack: 0,
    speed: 0,
    money: 0,
    lastDir: "up",
    swordAttack: "RECT",
    level:1,
    exp:0,
    expNeeded:50
}
    /*
    grass template
    {
        url: ("Images/BackgroundElements/Grass/Grass1.png"),
        x: 632,
        y: 82,
        width: 32,
        height: 32
    }
    skeleton template
    {
        url: ("Images/Characters/Skeleton/Skeleton.gif"),
        x: 600,
        y: 300,
        width: 32,
        height: 32,
        health: 1,
        speed:1
    }
    knight template
    {
        url: ("Images/Characters/knight/knight.gif"),
        x: 600,
        y: 300,
        width: 32,
        height: 32,
        health: 3,
        speed:1
    }

    */
