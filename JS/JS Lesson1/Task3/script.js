let ball = document.getElementsByClassName("ball")[0];
let ballSize = 100

function moveBall(event) {
    let x = event.clientX;
    let y = event.clientY;

    let half = ballSize/2;

    let width = window.innerWidth; // размеры окна
    let height = window.innerHeight;

    let newX = x;
    let newY = y;


    if (x < half) {
        newX = half;
    } else if (x > width - half) {
        newX = width - half - 1;
    }

    if (y < half) {
        newY = half;
    } else if (y > height - half) {
        newY = height - half - 1;
    }

    ball.style.left = newX + 'px';
    ball.style.top = newY + 'px';
}