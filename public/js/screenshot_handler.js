const electron = require('electron');
const { desktopCapturer, shell } = require('electron');
const { screen } = require('electron').remote;

const fs = require('fs');
const os = require('os');
const path = require('path');

const screenSize = getScreenSize();
const options = { types: ['window', 'screen'], thumbnailSize: screenSize };

document.querySelector('#o1').addEventListener('click', e => {
    desktopCapturer.getSources(options).then(async sources => {
        for (const source of sources) {
            console.log(source.name);
            if (source.name === 'Entire screen' || source.name === 'Screen 1') {
                const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')

                fs.writeFile(screenshotPath, source.thumbnail.toPNG(), (error) => {
                    if (error) return console.log(error)
                    shell.openExternal(`file://${screenshotPath}`)

                    console.log(`Saved screenshot to: ${screenshotPath}`);
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