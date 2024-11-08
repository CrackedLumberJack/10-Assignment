const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

const ctx = canvas.getContext("2d");

const rocketImg = new Image();
rocketImg.src = "Pics/Rocket.png";

let rocketObj = {
    x: 75,
    y: canvas.height - 175,
    speed: 1
};

let count = 10;
let timer = null;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    ctx.drawImage(rocketImg, rocketObj.x, rocketObj.y);

    ctx.fillStyle = "black";
    ctx.font = "50px serif";
    ctx.fillText("CountDown: " + count, 200, 40);
}

function update() {
    if (count > 0) {
        count--;
        draw();
    } else if (count === 0) {
        startLaunch(); 
    } 
}

function startLaunch() {
    rocketObj.y -= rocketObj.speed;
    rocketObj.speed *= 1.01;
    draw();

    if (rocketObj.y > -rocketImg.height) {
        requestAnimationFrame(startLaunch);
    }
}

function startCountdown() {
    if (timer) clearInterval(timer);
    timer = setInterval(update, 1000);
}

document.body.onload = function() {
    draw();
}

document.getElementById("startBtn").addEventListener("click", function() {
    document.getElementById("startBtn").disabled = true;
    startCountdown();
});

