let circles = document.getElementsByClassName("circle");
let btn = document.getElementsByClassName("btn"); // берем первую кнопку с этим классом
let index = 0;

let colors = ["red", "yellow", "green"];

btn[0].onclick = function(event) {
    for (let i = 0; i < circles.length; i++) {
        circles[i].style.backgroundColor = "gray";
    }

    circles[index].style.backgroundColor = colors[index];
    index++;

    if (index >= colors.length) {
        index = 0;
    }
}
