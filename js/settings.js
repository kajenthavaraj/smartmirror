const { TouchBarSlider } = require("electron")

var settings = document.getElementById('settings')
var hide = document.getElementById('hide')
var backbtn = document.getElementById('backbtn')

var mainDisplay = document.getElementsByClassName('Main')
var wifiDisplay = document.getElementsByClassName('Wifi')
var news = document.getElementsByClassName('news')
var settingsClass = document.getElementsByClassName('SettingsClass')
var dSettingsClass = document.getElementsByClassName('dSettingsCls')
var timebtn = document.getElementById('timebtn')
var datebtn = document.getElementById('datebtn')
var weatherbtn = document.getElementById('weatherbtn')
var tempbtn = document.getElementById('tempbtn')
var newsbtn = document.getElementById('newsbtn')
var brightnessSlide = document.getElementById('brightnessSlider')
var placeholder = document.getElementById('placeholder')
var brightnessDisplay = document.getElementById('brightnessDisplay')

var btnDisplays = ["Shown", "Hidden"]
var boolList = [true, false]
var btnHover = ["Hide", "Show"]

var settingsOpened = false;
var cover = false;
var currentPg = 'home';

function blurAll(blur, opacity) {
    for (var i = 0; i < mainDisplay.length; i++) {
        mainDisplay[i].style.filter = blur
        mainDisplay[i].style.opacity = (opacity * brightnessInt).toString()
    }
    for (var i = 0; i < news.length; i++) {
        news[i].style.filter = blur
        news[i].style.opacity = (opacity * brightnessInt).toString()
    }
    for (var i = 0; i < wifiDisplay.length; i++) {
        wifiDisplay[i].style.filter = blur
        wifiDisplay[i].style.opacity = (opacity * brightnessInt).toString()
    }
}
function changeAllVisible(vis) {
    for (var i = 0; i < mainDisplay.length; i++) { mainDisplay[i].style.visibility = vis }
    for (var i = 0; i < news.length; i++) { news[i].style.visibility = vis }
    for (var i = 0; i < wifiDisplay.length; i++) { wifiDisplay[i].style.visibility = vis }
}
function changeSettingPg() {
    for (var i = 0; i < settingsClass.length; i++) {
        settingsClass[i].style.display = 'none'
    }
    placeholder.style.display = 'block'
    backbtn.style.display = 'block'
    backbtn.style.opacity = (brightnessInt + 0.5).toString()
}
function hoverBtn(Elmnt, nameVal){
    Elmnt.innerHTML = btnHover[boolList.indexOf(displaySettings.get(nameVal))]
    Elmnt.style.color = "black"
    Elmnt.style.backgroundColor = "white"
}
function leaveBtn(Elmnt, nameVal){
    Elmnt.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get(nameVal))]
    Elmnt.style.color = "white"
    Elmnt.style.backgroundColor = "black"
}
function pressDisBtn(valNames){
    for (var i = 0; i < valNames.length; i++){
        if (displaySettings.get(valNames[i])){
            document.getElementById(valNames[i]).style.display = "none"
        }
        else{
            document.getElementById(valNames[i]).style.opacity = brightnessStr
            document.getElementById(valNames[i]).style.display = "block"
    }
        displaySettings.set(valNames[i], !displaySettings.get(valNames[i]))
        
    }
}

function goBack(page) {

}
hide.onclick = (() => {

    if (!cover) {
        document.getElementById("hide_icon").innerHTML = "visibility_off";
        changeAllVisible('hidden')
        cover = true;

    } else {
        document.getElementById("hide_icon").innerHTML = "visibility";
        changeAllVisible('visible')
        cover = false;
    }

})

settings.onclick = (() => {
    settingsOpened = !settingsOpened

    if (settingsOpened == true) {
        changeOpacity('0')
        setTimeout(()=>{
            document.getElementById('ssid').style.display = 'none'
            document.getElementById('psk').style.display = 'none'
        }, 2100)

        settings.style.color = 'skyblue'
        blurAll('blur(20px)', '0.5')
        
        if (currentPg == 'home') {
            for (var i = 0; i < settingsClass.length; i++) {
                settingsClass[i].style.transition = 'opacity 2s'
                settingsClass[i].style.display = 'block'
            }
            setTimeout(() => {
                if (settingsOpened == true) {
                    for (var i = 0; i < settingsClass.length; i++) { settingsClass[i].style.opacity = (brightnessInt+ 0.5).toString() }
                }
            }, 100)
        }
        else{
            currentPgCls = document.getElementsByClassName(currentPg)
            for(var i = 0; i < currentPgCls.length; i++){
                currentPgCls[i].style.opacity = (brightnessInt + 0.5).toString();
            }
            backbtn.style.opacity = (brightnessInt + 0.5.toString());
            placeholder.style.opacity = '1';
        }
    }
    else {
        document.getElementById('ssid').style.display = 'block'
        document.getElementById('psk').style.display = 'block'
        document.getElementById('ssid').style.opacity= (0.75 * brightnessInt).toString()
        document.getElementById('psk').style.opacity= (0.75 * brightnessInt).toString()
        
        settings.style.color = 'white'
        blurAll('blur(0px)', '1')
        document.getElementById('settingshead').style.transition = 'opacity 0.5s'
        for (var i = 0; i < settingsClass.length; i++) {
            settingsClass[i].style.transition = 'opacity 0.5s'
            settingsClass[i].style.opacity = '0'
        }
        if (currentPg == 'home') {
            document.getElementById('settingshead').style.opacity = '0'

            setTimeout(() => {
                if (settingsOpened == false) {
                    for (var i = 0; i < settingsClass.length; i++) {
                        settingsClass[i].style.display = 'none'
                    }
                }
            }, 600)
        }
        else {
            currentPgCls = document.getElementsByClassName(currentPg)
            for (var i = 0; i < currentPgCls.length; i++) {
                currentPgCls[i].style.opacity = '0';
            }
            backbtn.style.opacity = '0';
            placeholder.style.opacity = '0';

            setTimeout(() => {
                if (settingsOpened == false) {
                    for (var i = 0; i < currentPgCls.length; i++) {
                        currentPgCls[i].style.display = 'none'
                        currentPgCls[i].style.opacity = '1';
                        
                    }
                    backbtn.style.opacity = '1';
                    placeholder.style.opacity = '1';
                    placeholder.style.display = 'none'
                    backbtn.style.display = 'none'
                    currentPg = 'home';
                }
            }, 600)
        }
    }
})

document.getElementById('displayconfigbtn').onclick = () => {
    changeSettingPg();
    currentPg = 'dSettingsCls'
    for (var i = 0; i < dSettingsClass.length; i++) {
        dSettingsClass[i].style.display = 'block';
        dSettingsClass[i].style.opacity = (brightnessInt + 0.5).toString();
    }

    timebtn.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get("clock"))]
    datebtn.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get("date"))]
    weatherbtn.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get("weather"))]
    tempbtn.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get("temp"))]
    newsbtn.innerHTML= btnDisplays[boolList.indexOf(displaySettings.get("numHeadlines") > 0)]
    brightnessDisplay.innerHTML = (parseInt((brightnessInt * 100))).toString() + '%'
    brightnessSlide.value = brightnessInt * 100
}

timebtn.onmouseover = () => {
    hoverBtn(timebtn, "clock");
}
timebtn.onmouseleave = () => {
    leaveBtn(timebtn, "clock");
}
timebtn.onclick = () => {
    pressDisBtn(["clock"])
    hoverBtn(timebtn, "clock");
}

datebtn.onmouseover = () => {
    hoverBtn(datebtn, "date")
}
datebtn.onmouseleave = () => {
    leaveBtn(datebtn, "date")
}
datebtn.onclick = () => {
    pressDisBtn(["date"])
    hoverBtn(datebtn, "date")
}

weatherbtn.onmouseover = () => {
    hoverBtn(weatherbtn, "weather")
}
weatherbtn.onmouseleave = () => {
    leaveBtn(weatherbtn, "weather")
}
weatherbtn.onclick = () => {
    pressDisBtn(["weather", "icon"])
    hoverBtn(weatherbtn, "weather")
}

tempbtn.onmouseover = () => {
    hoverBtn(tempbtn, "temp")
}
tempbtn.onmouseleave = () => {
    leaveBtn(tempbtn, "temp")
}
tempbtn.onclick = () => {
    pressDisBtn(["temp"])
    hoverBtn(tempbtn, "temp")
}


newsbtn.onmouseover = () => {
    newsbtn.innerHTML = btnHover[boolList.indexOf(displaySettings.get("numHeadlines") > 0)]
    newsbtn.style.color = "black"
    newsbtn.style.backgroundColor = "white"
}
newsbtn.onmouseleave = () => {
    newsbtn.innerHTML = btnDisplays[boolList.indexOf(displaySettings.get("numHeadlines") > 0)]
    newsbtn.style.color = "white"
    newsbtn.style.backgroundColor = "black"
}
newsbtn.onclick = () => {
    if (displaySettings.get("numHeadlines") > 0){
        displaySettings.set("numHeadlines", 0)
        for (var i = 0; i < news.length; i++){
            news[i].style.display = "none"
        }
    }
    else{
        displaySettings.set("numHeadlines", 4)
        for (var i = 0; i < news.length; i++){
            news[i].style.display = "block"
            news[i].style.display = brightnessStr
        }
    }

    newsbtn.innerHTML = btnHover[boolList.indexOf(displaySettings.get("numHeadlines") > 0)]
    newsbtn.style.color = "black"
    newsbtn.style.backgroundColor = "white"
}

brightnessSlide.oninput = function(){
    displaySettings.set('brightness', this.value / parseFloat(100))
    brightnessInt = this.value / parseFloat(100)
    blurAll('blur(20px)', '0.5')
    brightnessStr = brightnessInt.toString()
    backbtn.style.opacity = (brightnessInt + 0.5).toString()
    brightnessDisplay.innerHTML = (parseInt((brightnessInt * 100))).toString() + '%'
    for(var i = 0; i < dSettingsClass.length; i ++){
        dSettingsClass[i].style.opacity = (brightnessInt + 0.5).toString()
    }
}

backbtn.onclick = () => {
    currentPgCls = document.getElementsByClassName(currentPg);
    for (var i = 0; i < currentPgCls.length; i++) {
        currentPgCls[i].style.display = 'none'
    }

    backbtn.style.display = 'none'
    placeholder.style.display = 'none'
    currentPg = 'home'

    for (var i = 0; i < settingsClass.length; i++) {
        settingsClass[i].style.display = 'block';
        settingsClass[i].style.opacity = (brightnessInt + 0.5).toString()
    }
}



