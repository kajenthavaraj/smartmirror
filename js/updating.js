const { ipcRenderer } = require('electron')

var opacityCheck = 0;
var showDownloading = true;
var timeOutTime;
var currentColor = 'black';
var intervalId;
var updateClass = document.getElementsByClassName('autoupdate')

ipcRenderer.on('message', function (event, text) {
    if (text == 'error' || text == 'unavailable') {
        window.location.replace("../html/index.html")
    }
    else if (text == 'available') {
        document.getElementById('available1').style.display = 'block';
        setTimeout(()=>{
            document.getElementById('available2').style.display = 'block';
        }, 2000)
        opacityCheck = 1;
        setTimeout(()=>{
            intervalId = setInterval(()=>{
                if(currentColor == 'black'){
                    document.body.style.backgroundColor = 'white';
                    document.getElementById('downloading').style.color = 'black';
                    currentColor = 'white';
                }
                else{
                    document.body.style.backgroundColor = 'black';
                    document.getElementById('downloading').style.color = 'white';
                    currentColor = 'black'
                }
            }, 3000)
        }, 5000)
        
    }
    else if (text == 'downloaded') {
        clearInterval(intervalId)
        document.body.style.backgroundColor = 'black';
        if (opacityCheck == 1) {

            showDownloading = false;
            document.getElementById('available1').style.opacity = '0'
            document.getElementById('available2').style.opacity = '0'

        }
        else {
            document.getElementById('downloading').style.opacity = '0'
        }

        setTimeout(() => {
            document.getElementById('downloaded').style.display = 'block'
            setTimeout(()=>{document.getElementById('downloaded').style.opacity = '0'}, 2500)
            setTimeout(()=>{document.getElementById('restarting').style.display = 'block'}, 5500)
            setTimeout(() => {
                document.getElementById('restarting').style.opacity = '0'
                setTimeout(()=>{
                    for(var i = 0; i < updateClass.length; i++){
                        updateClass[i].style.display = 'none';
                    }
                }, 2000)
            }, 8500)

        }, 2500)
    }
    else if (text != 'checking') {
        setTimeout(() => {
            document.getElementById('available1').style.opacity = '0'
            document.getElementById('available2').style.opacity = '0'
            setTimeout(() => {
                if (showDownloading == true) {
                    document.getElementById('downloading').style.display = 'block'
                    showDownloading = false;
                    opacityCheck = 0;
                }
            }, 3000)
        }, 3000)
    }
});