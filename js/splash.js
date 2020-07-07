const userInfo = new Store({
    configName: 'userInfo',
  });

var time = new Date();
var hrs24 = time.getHours();
if ((hrs24 >= 0 && hrs24 <= 3) || (hrs24 >= 17)) {
    greeting = "evening"
}
if (hrs24 >= 4 && hrs24 <= 11) {
    greeting = "morning"
}
if (hrs24 >= 12 && hrs24 <= 16) {
    greeting = "afternoon"
}
document.getElementById("message").innerHTML = 'Good' + " " + greeting + ", " + userInfo.get('userName');


