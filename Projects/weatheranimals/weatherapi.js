//>'д'<\\
//e60c46012d984d1e91630220170902
var apiKey = "f20176988aff40fe9da235920171402";
var weatherURL = "";
var animalImage = "";
var weatherImage ="";

function showAnimal(data) {
    weather ="";
    weatherImage=""
    animalImage=""
  var temperature = data.current.temp_f;
  var weather = data.current.condition.text;
  var isDay = data.current.is_day
  if(temperature == null ||temperature == undefined||temperature==""){
document.getElementById("weatherinfocontainer").innerHTML = "There has been an error";
  }
  else{
document.getElementById("weatherinfocontainer").innerHTML = "It is currently temperature "+temperature+" degrees fahrenheit. </br>The weather is "+weather+".</br>";
}
if(isDay == 1){
  document.getElementById("weatherinfocontainer").innerHTML += "It is day time."
}
else{
    document.getElementById("weatherinfocontainer").innerHTML += "It is night time."
}
if(temperature <= 20){
animalImage = "http://data.whicdn.com/images/174012532/large.jpg";
temperature = 200;
}else if(temperature <= 40){
animalImage= "http://techintranslation.com/wp-content/uploads/2012/12/Pusheen_static.png";
temperature = 160;
}else if(temperature <= 60){
animalImage= "http://data.whicdn.com/images/132187382/large.jpg";
temperature = 120;
}else if(temperature <= 80){
  animalImage="https://pbs.twimg.com/profile_images/458794430200152064/XdQULww6_400x400.png";
temperature = 80;
}else if(temperature <= 90||temperature > 90){
  animalImage="http://www.bdawgskip.com/images/pshsummer0.jpg";
temperature = 40;
}

if(weather == "Snow"||weather == "Patchy snow nearby"||weather == "Blowing snow"||weather == "Moderate snow"||weather == "Light snow"||weather == "Heavy snow"){
  weatherImage="images/Snow.gif";
}
else if(weather == "Patchy light rain"||weather == "Light rain"||weather == "Moderate rain"||weather == "Heavy rain"||weather == "Moderate or heavy rain shower"){
    weatherImage="images/Rain.gif";

}else if(weather == "Cloudy"||weather == "Partly cloudy"||weather == "Overcast"){
  weatherImage="images/Clouds.gif";
}
else if(isDay == 0){
  weatherImage="images/Moon.png";
}
else if(weather == "Sunny"||weather == "Clear"){
  weatherImage="images/Sunny.gif";
}
else{
  weatherImage=""
}

  document.getElementById("imagecontainer").innerHTML = "<img src="+animalImage+" width='50%' height='50%'></img>"
if(weatherImage==""){
  //document.body.style.backgroundColor = "hsl("+temperature+" ,100%, 50%)";
}else{
  document.body.style.backgroundImage = "url("+weatherImage+")";
 document.getElementById('weatherinfocontainer').style.backgroundColor = "hsl("+temperature+" ,100%, 50%)";
}
document.body.style.backgroundRepeat= "no-repeat";
document.body.style.backgroundSize= "100% 200%";
}

function makeRequest() {
  $.ajax({
    url: weatherURL,
    success: function(data) {
      showAnimal(data)
    }
  })
}


function submit() {
 var zipCode = document.getElementById("zipcode").value;
  weatherURL = "https://api.apixu.com/v1/current.json?key="+apiKey+"&q="+zipCode;
  makeRequest()
}
