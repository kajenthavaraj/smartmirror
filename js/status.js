var isOnline = require('is-online');
const Store = require('../store');

const displaySettings = new Store({
    configName: 'displaySettings',
    defaults: {
        clock: true,
        date: true,
        temp: true,
        icon: true,
        weather: true,
        numHeadlines: 4,
        brightness: 1,
    }
})


var displayWifi = true;
var alreadyMoved = false;
var intervalId;
var opacitySwitch = false;
var numRepeat = 0;
var brightnessInt = parseFloat(displaySettings.get('brightness'))
var brightnessStr = brightnessInt.toString()
//var numNews = new Array(displaySettings.get('numHeadlines'))
// var brightnessInt.toString() = displaySettings.get('brightness').toString()

var mainDisplay = document.getElementsByClassName('Main')
var wifiDisplay = document.getElementsByClassName('Wifi')
var news = document.getElementsByClassName('news')


function changeOpacity(status) {
    //document.getElementById('enterssid').style.opacity= status
    //document.getElementById('enterpsk').style.opacity= status
    document.getElementById('ssid').style.opacity = status * brightnessInt 
    document.getElementById('psk').style.opacity = status * brightnessInt
    document.getElementById('btn').style.opacity = status * brightnessInt
    // document.getElementById('ssid_wrap_div').style.display = status
    // document.getElementById('psk_wrap_div').style.display = status
    // document.getElementById('btn_wrap_div').style.display = status
}

function displayConnect() {
    if (displayWifi == true && alreadyMoved == false) {

        changeOpacity('0.75')
        document.getElementById('connect_text').style.opacity = brightnessStr
        document.getElementById('check').style.opacity = brightnessStr
        alreadyMoved = true;
        intervalId = setInterval(() => {
            if (opacitySwitch == true) {
                document.getElementById('connect_text').style.opacity = (brightnessInt * 0.5).toString()
                document.getElementById('check').style.opacity = (brightnessInt * 0.5).toString()
                opacitySwitch = false;
            }
            else {
                document.getElementById('connect_text').style.opacity = brightnessStr
                document.getElementById('check').style.opacity = brightnessStr
                opacitySwitch = true;
            }
        }, 1200)
    }

}

function onlineStatus() {
    isOnline()
        .then(online => {
            console.log("online?" + online)
            if (online == true) {
                for (var i = 0; i < wifiDisplay.length; i++) {
                    wifiDisplay[i].style.display = 'none'
                }

                setTimeout(()=>{

                    // var headDisplayed = 0
                    // while (headDisplayed < news.length){
                    //     if(i + 1 <= displaySettings.get('numHeadlines')){
                    //         news[i].style.transition = 'opacity 3s'
                    //         news[i].style.display = 'block'
                    //         news[i].style.opacity = brightnessStr
                    //         setTimeout(()=>{ headDisplayed++; }, 500)
                    //     }
                    // }

                    for (var i = 0; i < news.length; i ++){
                        if (i < displaySettings.get('numHeadlines')){
                            news[i].style.display = 'block'
                            news[i].style.transition = 'opacity 3s, filter 0.7s'
                        }
                    }

                    setTimeout(()=>{
                        news[0].style.opacity = brightnessStr
                        setTimeout(()=>{
                            news[1].style.opacity = brightnessStr
                            setTimeout(()=>{
                                news[2].style.opacity = brightnessStr
                                setTimeout(()=>{
                                    news[3].style.opacity = brightnessStr
                                    
                                },300)
                            },300)
                        },300)
                    },300)

                    if (displaySettings.get("icon") == false){
                        document.getElementById("temp").style.right = "0px"
                    }
    
                    for (var i = 0; i < mainDisplay.length; i++) {
                        if(mainDisplay[i].id == 'message'){
                            mainDisplay[i].style.opacity = brightnessStr
                        }
                        else if(displaySettings.get(mainDisplay[i].id) == false){
                            mainDisplay[i].style.display = 'none'
                            
                        }
                        else{
                            mainDisplay[i].style.transition = 'opacity 3s, filter 0.7s'
                            
                            mainDisplay[i].style.display = 'block'
                            mainDisplay[i].style.opacity = brightnessStr
                        }
                    }
                }, 4000)

                setTimeout(()=>{
                    for(var i = 0; i < news.length; i++){
                        news[i].style.transition = 'opacity 0.5s, filter 0.7s'
                        
                    }

                    for(var i = 0; i < mainDisplay.length; i++){
                        mainDisplay[i].style.transition = 'opacity 0.5s, filter 0.7s'
                        
                    }
                    
                }, 7000)


            } else {

                for (var i = 0; i < mainDisplay.length; i++) {
                    if (mainDisplay[i] == document.getElementById('message') ||
                        mainDisplay[i] == document.getElementById('clock') ||
                        mainDisplay[i] == document.getElementById('date')) {
                            
                        if(displaySettings.get(mainDisplay[i].id) == true){
                            mainDisplay[i].style.display = 'block'
                        }
                        else{
                            mainDisplay[i].style.display = 'none'
                        }
                    }
                    else { mainDisplay[i].style.display = 'none' }
                }
                for (var i = 0; i < news.length; i++) {
                    news[i].style.display = 'none'
                }

                 for (var i = 0; i < wifiDisplay.length; i++) {
                    wifiDisplay[i].style.display = 'block'
                }

                if (numRepeat == 0) {
                    displayConnect()
                }

                document.addEventListener('mousemove', e => {
                    displayWifi = true;
                    displayConnect()
                })


                document.addEventListener('click', () => {
                    displayWifi = true;
                    displayConnect()
                })

                // settings.onclick(()=>{
                    // if (settingsOpened == true){
                    //     changeOpacity('0')
                    //     setTimeout(()=>{
                    //         document.getElementById('ssid').style.display = 'none'
                    //         document.getElementById('psk').style.opacity = 'none'
                    //     }, 2000)
                    // }
                    // else{
                    //     document.getElementById('ssid').style.display = 'block'
                    //     document.getElementById('psk').style.opacity = 'block'
                    //     setTimeout(()=>{
                    //         changeOpacity('1')
                    //     }, 500)
                        
                    // }
                    
                // })
            }
            console.log("status: " + online)
        })
}
onlineStatus()

setTimeout(()=>{
    document.getElementById("settings").style.display = "block"
    document.getElementById("hide").style.display = "block"
}, 5000)
setInterval(() => {
    if (displayWifi == false) {
        alreadyMoved = false;
        clearInterval(intervalId)
        changeOpacity('0')
        document.getElementById('connect_text').style.opacity = 0
        document.getElementById('check').style.opacity = 0
        console.log('.')
    }
    displayWifi = false;
}, 20000)