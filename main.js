const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const Store = require('./store.js')
const { autoUpdater } = require('electron-updater');
const log = require('electron-log')
var firstPage;

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App Starting...')

//keep a global reference of the window object, if you dont, the window will
//be closed automatically when the JavaScript object garbage is collected.
let win

const tempInfo = new Store({
    configName: 'userInfo',
    defaults: {
        initialized: false
    }
});

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        //frame: false,
        width: 2000,
        height: 900,
        backgroundColor: "#000000",
        //frame: false,
        //kiosk:true,
        webPreferences: {
            nodeIntegration: true
        }
    })

    if (tempInfo.get('initialized') == false) {
        firstPage = './html/initialize.html'
    }
    else {
        firstPage = './html/index.html'
    }

    win.loadURL(url.format({
        pathname: path.join(__dirname, firstPage),
        protocol: 'file:',
        slashes: true
    }))

    //Open the DevTools.
    win.webContents.openDevTools()

    //Emitted when the window is closed.
    win.on('closed', () => {
        //Derefrence the window object, usually you would store windows
        // in an array if your app suports multi windows, this is the time
        //when you should delete the corresponding element.
        win = null
    })
    autoUpdater.checkForUpdates();
}

// function sendStatusToWindow(text) {
//     log.info(text);
//     win.webContents.send('message', text);
// }

// comment out from here

// autoUpdater.on('checking-for-update', () => {
//     sendStatusToWindow('checking');
// })
// autoUpdater.on('update-available', (info) => {
//     sendStatusToWindow('available');
// })
// autoUpdater.on('update-not-available', (info) => {
//     sendStatusToWindow('unavailable');
// })
// autoUpdater.on('error', (err) => {
//     sendStatusToWindow('error');
// })
// autoUpdater.on('download-progress', (progressObj) => {
//     let log_message = "Download speed: " + progressObj.bytesPerSecond;
//     log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
//     log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
//     sendStatusToWindow(log_message);
// })
// autoUpdater.on('update-downloaded', (info) => {
//     sendStatusToWindow('downloaded');
//     setTimeout(() => { autoUpdater.quitAndInstall() }, 13500)
// });

// to here in order to get rid of auto updates temporarily, also change firstPage to index.html



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

//Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for application and their menu bar
    // to stay active until the user quits explictly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

