var welcomeEle = document.getElementById('welcome');
var containerEle = document.getElementsByClassName('container')[0];
var toggleWelcomTimer = setTimeout(toggleWelcome,10000);

function toggleWelcome() {
    clearTimeout(toggleWelcomTimer);
    game.startGame();
    welcomeEle.style.opacity = 0;
    welcomeEle.zIndex = -1;
    containerEle.style.opacity = 1;
}

welcomeEle.style.width = window.innerWidth + 'px';
welcomeEle.style.height = window.innerHeight + 'px';
containerEle.style.width = window.innerWidth + 'px';
containerEle.style.height = window.innerHeight + 'px';
