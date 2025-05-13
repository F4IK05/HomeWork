let btns = document.getElementsByClassName("btn");

let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;

for (let i = 0; i < btns.length; i++) {
    btns[i].onmouseover = function() {
        let tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        
        tooltip.innerText = "Tooltip " + (i + 1);

        document.body.appendChild(tooltip);

        let rect = btns[i].getBoundingClientRect();
        
        tooltip.style.position = "absolute";
        tooltip.style.left = rect.left + "px";
        tooltip.style.top = rect.top + rect.height + "px";

        if (rect.top > rect.height) {
            tooltip.style.top = rect.top - rect.height + "px";
        }
    }

    btns[i].onmouseout = function() {
        let tooltips = document.getElementsByClassName("tooltip");
        for (let j = 0; j < tooltips.length; j++) {
            tooltips[j].remove();
        }
    }



}