const electron = require('electron');

const ipc = electron.ipcRenderer;

let btnPrint = document.querySelector('#o1');
btnPrint.addEventListener('click', closeWindow);

function closeWindow() {
    screen.style.backgroundColor = 'red';
    ipc.send('minimize-window');
}