//CREATE A COMMERCIAL ACCOUNT WITH THE NEW YORK TIMES
var nytUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=7cN54EqPHJ6jt0DZzvEPigaay57h8Ljt"

function nytimes(){
    fetch(nytUrl)
    .then(nytresponse => nytresponse.json())
    .then(nytData => {
        var headline1 = nytData.results[1].title;
        var headline2 = nytData.results[2].title;
        var headline3 = nytData.results[3].title;
        var headline4 = nytData.results[4].title;
        document.getElementById("headline1").innerHTML = "📰" + " " + headline1;
        document.getElementById("headline2").innerHTML = "📰" + " " + headline2;
        document.getElementById("headline3").innerHTML = "📰" + " " + headline3;
        document.getElementById("headline4").innerHTML = "📰" + " " + headline4;
    })
    .catch(setInterval(onlineStatus, 30000))
}
nytimes()
setInterval(nytimes, 900000)
