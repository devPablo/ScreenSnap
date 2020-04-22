let electron = require('electron');
let ipc = electron.ipcRenderer;


// Cancel screenshot
document.body.addEventListener('keydown', e => {
	if (e.key == 'Escape') {
		ipc.send('hide');
	}
});

// Screen
let screenDiv = document.querySelector('#screen');
screenDiv.style.display = 'none';

// Menu
let menu = document.querySelector('#menu');
menu.style.display = 'none';

// Resolution
let res = document.querySelector('#res');
let resp = document.querySelector('#resp');
res.style.display = 'none';

// Black screen
let divTop = document.querySelector('#top');
let divRight = document.querySelector('#right');
let divBottom = document.querySelector('#bottom');
let divLeft = document.querySelector('#left');

// Event listeners
document.addEventListener('mousedown', mouseDownEvent);
document.addEventListener('mouseup', mouseUpEvent);
document.addEventListener('mousemove', mouseMoveEvent);
menu.addEventListener('mouseenter', mouseEnterEvent);
menu.addEventListener('mouseleave', mouseLeaveEvent);
menu.addEventListener('mousedown', mouseDownEventMenu);

// Cancel drag event
screenDiv.ondragstart = () => { return false; }
menu.ondragstart = () => { return false; }
divTop.ondragstart = () => { return false; }
divRight.ondragstart = () => { return false; }
divBottom.ondragstart = () => { return false; }
divLeft.ondragstart = () => { return false; }

// Variables
let selection = false;
let inMenu = false;
let isMenuGlitch = false;

let pos = {
	x: 0,
	y: 0
};

let savedScreen = {
	x: 0,
	y: 0,
	ex: 0,
	ey: 0,
	width: 0,
	height: 0
}

// Mouse down event
function mouseDownEvent(event) {
	if (!inMenu && isMenuGlitch) {
		isMenuGlitch = false;
	}
	if (!inMenu) {
		screenDiv.removeAttribute('style');
		menu.style.display = 'none';

		selection = true;
		pos.x = event.x;
		pos.y = event.y;

		divTop.style.height = event.y;

		divBottom.style.height = window.innerHeight - event.y;

		divLeft.style.top = event.y;
		divLeft.style.width = event.x;
		divLeft.style.height = 0;

		divRight.style.top = event.y;
		divRight.style.width = event.x;
		divRight.style.height = 0;

		screenDiv.style.top = event.y;
		screenDiv.style.left = event.x;
	}
}

// Mouse up event
function mouseUpEvent(event) {
	if (!inMenu && !isMenuGlitch) {
		if (screenDiv.style.width == 0 || screenDiv.style.height == 0) {
			screenDiv.style.display = 'none';
			menu.style.display = 'none';
			res.style.display = 'none';
		} else {
			savedScreen.x = Number.parseInt(screenDiv.style.left);
			savedScreen.y = Number.parseInt(screenDiv.style.top);
			savedScreen.ex = event.x;
			savedScreen.ey = event.y;
			savedScreen.width = Number.parseInt(screenDiv.style.width);
			savedScreen.height = Number.parseInt(screenDiv.style.height);

			// Menu
			setMenuPosition(event);

			// Display Draggable
			// displayDraggable(event.x, event.y, 0, 0, 'nw-resize');

			// Display Draggable
			// displayDraggable(screenDiv.style.left, screenDiv.style.top, 0, 0, 'nw-resize');
		}
		selection = false;
	}
}

// Mouse move event
function mouseMoveEvent(event) {
	if (selection) {
		if (!inMenu) {
			res.style.display = 'flex';
			resp.innerHTML = Math.abs(pos.x - event.x) + 'x' + Math.abs(pos.y - event.y);

			document.querySelector('#resize').innerHTML = '';

			// Width
			if (event.x > pos.x) { // Drag right
				let rightWidth = window.innerWidth - event.x;
				divRight.style.width = rightWidth;
				divLeft.style.width = pos.x;

				// Screen
				screenDiv.style.left = pos.x;
				screenDiv.style.width = Math.abs(pos.x - event.x + 2);
			} else { // Drag left
				divLeft.style.width = event.x;
				let rightWidth = window.innerWidth - pos.x;
				divRight.style.width = rightWidth - 2;

				// Screen
				screenDiv.style.left = event.x;
				screenDiv.style.width = Math.abs(pos.x - event.x);
			}

			// Top/Bottom height
			if (event.y > pos.y) { // Drag down

				// Top/Bottom height
				divTop.style.height = pos.y;
				let bottomHeight = window.innerHeight - event.y;
				divBottom.style.height = bottomHeight;

				// Side height
				let sideHeight = event.y - pos.y;
				divLeft.style.height = sideHeight;
				divRight.style.height = sideHeight;

				divLeft.style.top = pos.y;
				divRight.style.top = pos.y;

				// Screen
				screenDiv.style.top = pos.y;
				screenDiv.style.height = Math.abs(pos.y - event.y + 2);

				// Resolution
				if (event.x > pos.x) { // Right
					if (pos.y < 25) {
						res.style.top = pos.y + 5;
						res.style.left = pos.x + 5;
					} else {
						res.style.top = pos.y - 27;
						res.style.left = pos.x;
					}
				} else { // Left
					if (pos.y < 25) {
						res.style.top = pos.y + 5;
						res.style.left = event.x + 5;
					} else {
						res.style.top = pos.y - 27;
						res.style.left = event.x;
					}
				}
			} else { // Drag up

				// Top/Bottom height
				divTop.style.height = event.y;
				let bottomHeight = window.innerHeight - pos.y;
				divBottom.style.height = bottomHeight - 2;

				// Side height
				let sideHeight = pos.y - event.y;
				divLeft.style.height = sideHeight + 2;
				divRight.style.height = sideHeight + 2;

				divLeft.style.top = event.y;
				divRight.style.top = event.y;

				// Screen
				screenDiv.style.top = event.y;
				screenDiv.style.height = Math.abs(pos.y - event.y);

				// Resolution
				if (event.x > pos.x) { // Right
					if (event.y < 25) {
						res.style.top = event.y + 5;
						res.style.left = pos.x + 5;
					} else {
						res.style.top = event.y - 27;
						res.style.left = pos.x;
					}
				} else { // Left
					if (event.y < 25) {
						res.style.top = event.y + 5;
						res.style.left = event.x + 5;
					} else {
						res.style.top = event.y - 27;
						res.style.left = event.x;
					}
				}
			}
		}
	}
}

// Menu
function mouseDownEventMenu() {
	isMenuGlitch = true;
}

function mouseEnterEvent() {
	inMenu = true;
}

function mouseLeaveEvent() {
	inMenu = false;
}

function setMenuPosition(event) {
	menu.removeAttribute('style');

	if (event.y > pos.y) { // Down
		if (event.x > pos.x) { // Right
			if (window.innerHeight - event.y < 25) {
				menu.style.top = savedScreen.y - 27;
				menu.style.left = savedScreen.ex;
			} else {
				menu.style.top = savedScreen.ey + 2.5;
				menu.style.left = savedScreen.ex;
			}
		} else { // Left
			if (window.innerHeight - event.y < 25) {
				menu.style.top = savedScreen.y - 27;
				menu.style.left = pos.x + 2.5;
			} else {
				menu.style.top = savedScreen.ey + 2.5;
				menu.style.left = pos.x + 2.5;
			}
		}
	} else { // Up
		if (event.x > pos.x) { // Right
			if (window.innerHeight - pos.y < 25) {
				menu.style.top = event.y - 25;
				menu.style.left = savedScreen.ex;
			} else {
				menu.style.top = pos.y + 5;
				menu.style.left = event.x;
			}
		} else { // Left
			if (window.innerHeight - pos.y < 25) {
				menu.style.top = savedScreen.y - 25;
				menu.style.left = pos.x + 2.5;
			} else {
				menu.style.top = pos.y + 5;
				menu.style.left = pos.x + 2.5;
			}
		}
	}
}

function displayDraggable(x, y, translateX, translateY, cursor) {
	let draggableDiv = document.createElement('div');
	draggableDiv.style.width = '7.5px';
	draggableDiv.style.height = '7.5px';

	draggableDiv.style.transform = 'translate(-25%, -50%)';
	draggableDiv.style.position = 'absolute';
	draggableDiv.style.left = x;
	draggableDiv.style.top = y;

	draggableDiv.style.backgroundColor = '#929292';
	draggableDiv.style.border = '1px solid #FFF';
	draggableDiv.style.borderRadius = '50%';
	draggableDiv.style.cursor = cursor;
	draggableDiv.style.zIndex = 3000;

	document.querySelector('#resize').appendChild(draggableDiv);
	// return draggableDiv;
}