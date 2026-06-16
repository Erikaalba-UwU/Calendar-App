const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
//close button
ipcMain.on('close-window', () => {
    const win = BrowserWindow.getFocusedWindow();

    if (win) {
        win.close();
    }
});

let win; // global reference

function createWindow() {
  win = new BrowserWindow({
    width: 250,
    height: 270,
    resizable: true, // allow programmatic resize
    maximizable: false,
    frame: false,
    transparent: true,

    icon: path.join(__dirname, 'images', 'App-ICON.ico'),

    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// resize handler
ipcMain.on('resize-window', (event, width, height) => {
  if (win) {
    win.setSize(width, height);
  }
});

// quit app (standard behavior)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// const { app, BrowserWindow } = require('electron');

// function createWindow() {
//   const win = new BrowserWindow({   
//     width: 250,
//     height: 270,
//     resizable: false,
//     maximizable: false,
//     frame: false,
//     transparent: true,
//     webPreferences: {
//       contextIsolation: true
//     }
//   });

//   win.loadFile('index.html');
// }


// app.whenReady().then(createWindow);


