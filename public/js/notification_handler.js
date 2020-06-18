function displayNotification(filename, path) {
    let myNotification = new Notification('ScreenSnap', {
        body: `Screenshot is saved to ${filename}\nClick here to view`,
        icon: __dirname + '/public/img/logo.png' 
    })
    
    myNotification.onclick = () => {
        shell.openExternal(path);
    }
}

