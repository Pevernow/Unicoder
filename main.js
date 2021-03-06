// Modules to control application life and create native browser window
const {app, BrowserWindow, screen, globalShortcut} = require('electron')
const path = require("path")

function createWindow () {
  // Create the browser window.
  let size = screen.getPrimaryDisplay().workAreaSize
  let width=parseInt(size.width * 0.2);
  let height=parseInt(size.height*0.3);
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true
    },
    transparent: true,
    frame: false
  })
  mainWindow.hide();
  mainWindow.setAlwaysOnTop(true);
  //mainWindow.webContents.openDevTools();
  mainWindow.setSkipTaskbar(true);
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.whenReady().then(() => {
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+Alt+T', () => {
    console.log("run")
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.executeJavaScript("document.getElementById('input').focus()");
    mainWindow.webContents.executeJavaScript("document.getElementById('input').value=''")
  })

  if (!ret) {
    console.log('registration failed')
  }
})