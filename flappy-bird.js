const game = document.getElementById("game");
const wall = document.getElementById("wall");
const hole = document.getElementById("hole");
const player = document.getElementById("player");
var jumping = false;
var score = 0;

hole.addEventListener("animationiteration", () => {
    newHeight = -((Math.random() * 300) + 150);
    hole.style.top = newHeight + "px";
})

setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let holeLeft = parseInt(window.getComputedStyle(hole).getPropertyValue("left"));
    if (!jumping) {
        player.style.top = (playerTop + 3) + "px";
    }
    if (playerTop > 480 || this.didCrash(playerTop, Math.abs(holeTop), Math.abs(holeLeft))) {
        triggerGameOver();
    }
}, 10);

function jump() {
    jumping = true;
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let jumpCount = 0;
    let jumpInterval = setInterval(function() {
        if ((playerTop > 6) && (jumpCount < 15)) {
            player.style.top = (playerTop - 50) + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = false;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}

function didCrash(playerTop, holeTop, holeLeft) {
    console.log(`HoleLeft: ${holeLeft}; HoleTop: ${500 - holeTop}; HoleBottom: ${500 - (holeTop - 150)}; playerTop: ${playerTop}`);
    return (holeLeft < 21) && ((playerTop < 500 - holeTop) || (playerTop > 500 - (holeTop - 150)));
}

function triggerGameOver() {
    alert("Game over!");
    player.style.top = 100 + "px";
}