let text = document.getElementsByTagName("input");

text[0].oninput = function(event) {
    text[0].value = text[0].value.replace(/-?\d+/, '')
}