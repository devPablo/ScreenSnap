electron = require('electron');
const { desktopCapturer, shell } = require('electron');
const { screen } = require('electron').remote;
const Jimp = require('Jimp');
const os = require('os');
const path = require('path');

//renderer.js - renderer process example
const { remote } = require('electron'),
    dialog = remote.dialog,
    WIN = remote.getCurrentWindow();

ipc = electron.ipcRenderer;
const fs = require('fs');

const screenSize = getScreenSize();
const options = { types: ['screen'], thumbnailSize: screenSize };
let mainScreenSource = null;




document.querySelector('#o1').addEventListener('click', e => {
    ipc.send('hide');
    document.body.style.cursor = 'default';
    // document.body.childNodes.forEach(e => {
    //     if (e.nodeType != 3) {
    //         if (e.nodeName != 'undefined') {
    //             if (e.nodeName != 'SCRIPT' || e.nodeName != '#text') {
    //                 e.style.display = 'none';
    //             }
    //         }
    //     }

    // });

    const desktopDir = path.join(os.homedir(), "Desktop");
    let saveOptions = {
        //Placeholder 1
        title: "Save Screenshot",

        //Placeholder 2
        defaultPath: desktopDir + '\\Screenshot_1.png',

        //Placeholder 4
        buttonLabel: "Save",

        //Placeholder 3
        filters: [
            { name: 'PNG', extensions: ['png'] }
        ]
    }

    
    desktopCapturer.getSources(options).then(async sources => {
        for (const source of sources) {

            if (source.name.toLowerCase() === 'entire screen' || source.name === 'screen 1') {
                mainScreenSource = source;

                dialog.showSaveDialog(WIN, saveOptions, (filename) => {
                }).then(res => {
                    if (!res.canceled) {
                        fs.writeFile(res.filePath, mainScreenSource.thumbnail.toPNG(), (error) => {
                            if (error) return console.log(error)
        
                            Jimp.read(res.filePath, (err, image) => {
                                if (err) throw err;
                                image
                                    .crop(savedScreen.x - 10, savedScreen.y - 10, savedScreen.width, savedScreen.height)
                                    .writeAsync(res.filePath).finally(() => {
                                        let filename = res.filePath.split('\\').pop();
                                        displayNotification(filename, res.filePath);
                                        resetUI();
                                    });
                            });
                        })
                    }
                });

                
            }
        }
    })



});

function getScreenSize() {
    const screenSize = screen.getPrimaryDisplay().workAreaSize;
    const maxDimension = Math.max(screenSize.width, screenSize.height);
    return {
        width: maxDimension * window.devicePixelRatio,
        height: maxDimension * window.devicePixelRatio
    }
}