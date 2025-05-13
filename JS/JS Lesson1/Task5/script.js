var books = document.getElementsByTagName("li");

for(var i = 0; i < books.length; i++) {
    books[i].onclick = function() {
        for (var j = 0; j < books.length; j++) {
            books[j].style.backgroundColor = "";
        }

        this.style.backgroundColor = "orange";
    }
}