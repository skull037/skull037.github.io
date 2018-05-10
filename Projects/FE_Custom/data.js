//skip first object has basic map info
var testMapData=[{x:10,y:10,name:"test"},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:0},{t:5},{t:5},{t:3},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1},{t:1},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1,s:2},{t:1,s:2},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1,s:2},{t:1,s:2},{t:1,s:2},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1,s:2},{t:1,s:2},{t:1,s:2},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1},{t:1},{t:1},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:0},{t:0},{t:0},{t:1},{t:1},
                                       {t:1},{t:0},{t:0},{t:0},{t:0},{t:0},{t:0},{t:0},{t:0},{t:1},
                                       {t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1},{t:1}]
//x & y are actual X & y, img is sprite, mx &my are "ghost" X & Y, m is spaces that can be moved, pm is how far the ghost can go, 
var playerCharacters=[{x:1,y:1,img:0,m:3,mx:1,my:1,pm:3,aim:75,hp:5,strength:1,magic:2,done:0,dead:false,name:"Alpha"},{x:2,y:1,img:0,m:2,mx:1,my:1,pm:2,aim:75,hp:7,strength:2,magic:2,done:0,dead:false,name:"Beta"}]
//0 is guard 1 is rush 2 is balanced
var testMapEnemies =[createEnemy(8,8,"guard"),createEnemy(3,3,"barb"),createEnemy(3,5,"barb")]
//create enemies (x,y,type)
function createEnemy(xEVal,yEVal,type){
    if(type=="guard"){
    return {x:xEVal,y:yEVal,hp:2,strength:2,magic:1,ai:0,m:2,pm:2,aim:50,image:"knight dude"}
    }else if(type == "barb"){
    return {x:xEVal,y:yEVal,hp:3,strength:3,magic:1,ai:1,m:3,pm:3,aim:50,image:"good ol' axes"}
    }
}
var moveArray=[{x:-1,y:-1},{x:-1,y:-1},{x:-1,y:-1},{x:-1,y:-1},{x:-1,y:-1}];