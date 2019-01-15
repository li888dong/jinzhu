var welcomeEle = document.getElementById('welcome');
var containerEle = document.getElementsByClassName('container')[0];
var toggleWelcomTimer = setTimeout(toggleWelcome,3000);

function toggleWelcome() {
    clearTimeout(toggleWelcomTimer);
    welcomeEle.style.opacity = 0;
    welcomeEle.zIndex = -1;
    containerEle.style.opacity = 1;
}

