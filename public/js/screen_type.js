if (settings.screenType == 'dark') {
    divTop.classList.add('dark');
    divRight.classList.add('dark');
    divBottom.classList.add('dark');
    divLeft.classList.add('dark');
    screen.classList.add('screentype__dark');
}

if (settings.screenType == 'light') {
    screen.classList.add('screentype__light');
}