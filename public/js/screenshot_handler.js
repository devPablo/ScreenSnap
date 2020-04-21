const electron = require('electron');
const { desktopCapturer, shell } = require('electron');
const { screen } = require('electron').remote;
const Jimp = require('Jimp');

const ipc = electron.ipcRenderer;

const fs = require('fs');
const os = require('os');
const path = require('path');

const screenSize = getScreenSize();
const options = { types: ['window', 'screen'], thumbnailSize: screenSize };

document.querySelector('#o1').addEventListener('click', e => {
    ipc.send('hide');
    document.body.childNodes.forEach(e => {
        if (e.nodeType != 3) {
            if (e.nodeName != 'undefined') {
                if (e.nodeName != 'SCRIPT' || e.nodeName != '#text') {
                    e.style.display = 'none';
                }
            }
        }

    });
    desktopCapturer.getSources(options).then(async sources => {
        for (const source of sources) {
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {

                const screenshotPath = 'screenshot.png'

                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
                    if (error) return console.log(error)

                    Jimp.read(screenshotPath, (err, image) => {
                        if (err) throw err;
                        image
                            .crop(savedScreen.x - 10, savedScreen.y - 10, savedScreen.width, savedScreen.height)
                            .writeAsync('screenshot.png').finally(() => {
                                // Notification
                            });
                    });
                })
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