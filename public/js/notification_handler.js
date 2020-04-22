function displayNotification(path) {
    let myNotification = new Notification('ScreenSnap', {
        body: `Screenshot is saved to ${path}\nClick here to view`,
        icon: __dirname + '/public/img/logo.png' 
    })
    
    myNotification.onclick = () => {
        shell.openExternal(__dirname + '/' + path);
    }
}

