//microwave,toaster,oven,blender, washing machine,sink,fridge
var microwaveStat = 0;
var toasterStat = 0;
var ovenStat = 0;
var washingMachineStat = 0;
var sinkStat = 0;
var blenderStat = 0;
var fridgeStat = 0;

function submitQuiz() {
    //checks answers
    var currentSelection = document.querySelector("input[name='cooking']:checked").value;
    if (currentSelection == "rad") {
        microwaveStat++;
    } else if (currentSelection == "heat") {
        toasterStat++
        ovenStat++;
    } else {
        sinkStat++;
        washingMachineStat++;
        blenderStat++;
        fridgeStat++;
    }
    currentSelection = document.querySelector("input[name='water']:checked").value;
    if (currentSelection == "yes") {
        sinkStat++;
        washingMachineStat++;
    } else {
        blenderStat++;
        microwaveStat++;
        toasterStat++
        ovenStat++;
        fridgeStat++;
    }
    currentSelection = document.querySelector("input[name='size']:checked").value;
    if (currentSelection == "big") {
        sinkStat++;
        fridgeStat++;
    } else if (currentSelection == "med") {
              ovenStat++;
        washingMachineStat++;
    } else {
        blenderStat++;
        microwaveStat++;
        toasterStat++
    }
    currentSelection = document.querySelector("input[name='glass']:checked").value;
    if (currentSelection == "yes") {
        microwaveStat++;
        blenderStat++;
        ovenStat++;
    } else {
        washingMachineStat++;
        sinkStat++;
        fridgeStat++;
        toasterStat++;
    }
    currentSelection = document.querySelector("input[name='clean']:checked").value;
    if (currentSelection == "yes") {
          sinkStat++;
          washingMachineStat++;
    } else {
                fridgeStat++;
        blenderStat++;
        ovenStat++;
        microwaveStat++;
        toasterStat++;
    }
    currentSelection = document.querySelector("input[name='clock']:checked").value;
    if (currentSelection == "yes") {
        microwaveStat++;
        ovenStat++;
    } else {
        washingMachineStat++;
        sinkStat++;
        fridgeStat++;
        blenderStat++;
        toasterStat++;
    }
    currentSelection = document.querySelector("input[name='input']:checked").value;
     if(currentSelection=="none") {
        fridgeStat++;
    } else if(currentSelection=="knobs"){
    ovenStat++;
  }
  else if ("buttons") {
        blenderStat++;
        washingMachineStat++;
        microwaveStat++;
  }
  else{
            toasterStat++;
        sinkStat++;
  }
  currentSelection = document.querySelector("input[name='handle']:checked").value;
  if (currentSelection == "yes") {
      microwaveStat++;
      ovenStat++;
      washingMachineStat++;
      fridgeStat++;
  } else {
      sinkStat++;
      blenderStat++;
      toasterStat++;
  }
  currentSelection = document.querySelector("input[name='light']:checked").value;
  if (currentSelection == "yes") {
      microwaveStat++;
      ovenStat++;
      fridgeStat++;
  } else {
      washingMachineStat++;
      sinkStat++;
      blenderStat++;
      toasterStat++;
  }

  currentSelection = document.querySelector("input[name='light']:checked").value;
  if (currentSelection == "yes") {
      microwaveStat++;
      ovenStat++;
      fridgeStat++;
  } else {
      washingMachineStat++;
      sinkStat++;
      blenderStat++;
      toasterStat++;
  }
  currentSelection = document.querySelector("input[name='choice']:checked").value;
  if (currentSelection == "micro") {
      microwaveStat++;
  } else if(currentSelection == "toast") {
      toasterStat++;
  }
  else if(currentSelection == "oven") {
      ovenStat++;
  }else if(currentSelection == "fridge") {
        fridgeStat++;
    }else if(currentSelection == "wash") {
  washingMachineStat++;
      }else if(currentSelection == "sink") {
    sinkStat++;
  }else if(currentSelection == "blend") {
            blenderStat++;
          }
    //determine which is highest
    var App = Math.max(microwaveStat, toasterStat, ovenStat, washingMachineStat, sinkStat, blenderStat,fridgeStat);
    if (toasterStat == App) {
        document.getElementById('result').innerHTML = "You are a Toaster!"+"<br><img src='images/Toaster.jpg' height='500' width='500'></img>";
    } else if (microwaveStat == App) {
        document.getElementById('result').innerHTML = "You are a Microwave!"+"<br><img src='images/microwave.jpeg'height='500' width='500'></img>";
    } else if (ovenStat == App) {
        document.getElementById('result').innerHTML = "You are a Oven!"+"<br><img src='images/oven.png'height='500' width='500'></img>";
    } else if (washingMachineStat == App) {
        document.getElementById('result').innerHTML = "You are a Dish Washer!"+"<br><img src='images/dishwashers.png'height='500' width='500'></img>";
    } else if (sinkStat == App) {
        document.getElementById('result').innerHTML = "You are a Sink!"+"<br><img src='images/sink.jpg'height='500' width='500'></img>";
    } else if (blenderStat == App) {
        document.getElementById('result').innerHTML = "You are a Blender!"+"<br><img src='images/blender.jpg'height='500' width='500'></img>";
    } else if (fridgeStat == App) {
        document.getElementById('result').innerHTML = "You are a Fridge!"+"<br><img src='images/fridge.jpg'height='500' width='500'></img>";
    }
    else{
        document.getElementById('result').innerHTML = "You the mystic 'ALL IN ONE KITCHEN DEVICE'!"+"<br><img src='images/kitchen.jpg'></img>";
    }
    //reset vars
    microwaveStat = 0;
    toasterStat = 0;
    ovenStat = 0;
    washingMachineStat = 0;
    sinkStat = 0;
    blenderStat = 0;
    fridgeStat = 0;
}
