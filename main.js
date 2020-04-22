const os = require('os');
const path = require('path');
const url = require('url');
const fs = require('fs');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const Menu = electron.Menu;
const globalShortcut = electron.globalShortcut;

const ipc = electron.ipcMain;

// Enforce scale factor
app.commandLine.appendSwitch('high-dpi-support', 1);
app.commandLine.appendSwitch('force-device-scale-factor', 1);

// App listeners
app.on('ready', () => {
  globalShortcut.register('Control+PrintScreen', () => {
    new PrintScreen();
  })

  tray = new Tray(__dirname + '/public/img/tray_icon.png');
  tray.setToolTip('ScreenSnap');
});

app.on('window-all-closed', e => {
  e.preventDefault();
})

// Print Screen class
class PrintScreen {
  constructor() {
    this.width = electron.screen.getPrimaryDisplay().bounds.width;
    this.height = electron.screen.getPrimaryDisplay().bounds.height;

    this.mainWindow = new BrowserWindow({
      title: 'f3380d92-3c2e-4f18-a9eb-32c715e7f321',
      x: -10,
      y: -10,
      alwaysOnTop: true,
      transparent: true,
      show: true,
      frame: false,
      resizable: false,
      webPreferences: { nodeIntegration: true }
    });

    this.mainWindow.setSize(this.width + 15, this.height + 15);

    this.mainWindow.on('page-title-updated', e => {
      e.preventDefault();
    });

    ipc.on('quit', e => {
      this.mainWindow.destroy();
    });

    ipc.on('hide', e => {
      this.mainWindow.hide();
    });

    ipc.on('minimize', () => {
      this.mainWindow.minimize();
    });

    ipc.on('maximize', () => {
      this.mainWindow.maximize();
    });

    this.mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }
}

