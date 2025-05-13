let btn = document.getElementsByTagName("input");
let block = document.getElementsByClassName("block")[0];

btn[0].onclick = function(event) {
   block.style.display = "block";
}

btn[1].onclick = function(event) {
    block.style.display = "none";
}