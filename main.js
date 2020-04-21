const os = require('os');
const path = require('path');
const url = require('url');
const fs = require('fs');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Tray = electron.Tray;
const globalShortcut = electron.globalShortcut;
const { desktopCapturer, shell } = require('electron')

const ipc = electron.ipcMain;
const dialog = electron.dialog;

// Enforce scale factor
app.commandLine.appendSwitch('high-dpi-support', 1);
app.commandLine.appendSwitch('force-device-scale-factor', 1);

class PrintScreen {
    constructor() {
        this.width = electron.screen.getPrimaryDisplay().bounds.width;
        this.height = electron.screen.getPrimaryDisplay().bounds.height;

        this.mainWindow = new BrowserWindow({
            title: 'f3380d92-3c2e-4f18-a9eb-32c715e7f321',
            x: -10,
            y: -10,
            alwaysOnTop: true,
            frame: false,
            show: true,
            transparent: true,
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

        this.mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }
}

app.on('ready', () => {
    globalShortcut.register('Control+PrintScreen', () => {
        global.PrintScreen = new PrintScreen();
    })
});

app.on('window-all-closed', e => {
    e.preventDefault();
})


