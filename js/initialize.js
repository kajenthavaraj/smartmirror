const Store = require('../store.js')
var time = new Date()


var intervalId;
var goAhead = false;

const userInfo = new Store({
    configName: 'userInfo',
    defaults: {
        initialized: false
    }
});

const displaySettings = new Store({
    configName: 'displaySettings',
    defaults: {
        clock: true,
        date: true,
        temp: true,
        icon: true,
        weather: true,
        numHeadlines: 4,
        brightness: 100,
    }
})

intervalId = setInterval(() => {
    if (/\S/.test(document.getElementById('getName').value)) {
        document.getElementById('nextButton').style.opacity = "1"
        goAhead = true;
    }
    else {
        document.getElementById('nextButton').style.opacity = "0"
        goAhead = false;
    }
}, 100
)

document.getElementById('nextButton').onclick = () => {
    if (goAhead == true) {
        clearInterval(intervalId)
        document.getElementById('nextButton').style.transition = "opacity 0.5s, left 2s, color 0.2s"


        setTimeout(
            ()=>{
                Keyboard.close();
                console.log(userInfo.getPath())
                //console.log(userInfo.get('userName'))
                userInfo.set('userName', document.getElementById('getName').value)
                userInfo.set('initialized', true)
                userInfo.set('dateStarted', time.getDate().toString() + "/" + time.getMonth().toString() + "/" + time.getFullYear().toString())

                displaySettings.set('clock', true)
                displaySettings.set('date', true)
                displaySettings.set('weather', true)
                displaySettings.set('icon', true)
                displaySettings.set('weather', true)
                displaySettings.set('numHeadlines', 4)
                displaySettings.set('brightness', 100)

                document.getElementById('enterName').style.opacity = '0'
                document.getElementById('getName').style.opacity = '0'
                document.getElementById('nextButton').style.opacity = '0'

                document.getElementById('enterName').style.left = "0px"
                document.getElementById('getName').style.left = "0px"
                document.getElementById('nextButton').style.left = "0px"

                setTimeout(() => {
                    window.location.replace("../html/index.html")
                }, 2000)
            }, 100
        )}

    }

