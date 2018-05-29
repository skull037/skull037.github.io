function randomNum(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
var max = 10;
var min = 1;
var num = randomNum(min,max);

function numFun(){
var guess = document.getElementById("input").value;
    var output = document.getElementById("output");
    document.getElementById("input").textContent = "";
    if(num>guess){
    output.textContent = "You guessed "+guess+". guess higher!"
        document.getElementById("pile").textContent += "+"+guess +" ";
    }
    else if(num<guess){
    output.textContent = "You guessed "+guess+". guess lower!"
    document.getElementById("pile").textContent += "-"+guess+" ";
    }
    else if(num == guess){
        if(max>999){
    output.textContent = "You guessed right, somehow."
    }
        else{
    output.textContent = "You guessed right!"
    }
    }
        else{
        output.textContent = "Something went horribly wrong!"
    }
}
function newNum(){
    num = randomNum(min,max);
        document.getElementById("pile").textContent = "";
    
}
function setRange(){
min = document.getElementById("minInput").value;
max = document.getElementById("maxInput").value;
newNum();
document.getElementById("header2").textContent = "Guess A number from "+min+" to "+max;
}