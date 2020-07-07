setInterval(displayClock, 1000);
function displayClock(){
  var time = new Date();
  var hrs24 = time.getHours();
  var hours = time.getHours();
  var mins = time.getMinutes();
  var sec = time.getSeconds();

  if (hrs24 > 12){
    hours = hrs24 - 12;
  }
  if (hours == 0){
    hours = 12;
  }
  if(mins <= 9){
    mins = "0" + mins;
  }

  document.getElementById("clock").innerHTML = hours + ":" + mins;
}