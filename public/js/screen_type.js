if (settings.screenType == 'dark') {
    divTop.classList.add('dark');
    divRight.classList.add('dark');
    divBottom.classList.add('dark');
    divLeft.classList.add('dark');
    screenDiv.classList.add('screentype__dark');
}

if (settings.screenType == 'light') {
    screenDiv.classList.add('screentype__light');
}