const username = localStorage.getItem('username');
const displayUsername = document.getElementById('usernameDisplay');

if (username) {
    displayUsername.textContent = username;
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var downArrow = document.getElementById("downArrow");

// Открытие модального окна
btn.addEventListener("click", function() {
    modal.style.display = "block";
    downArrow.style.transform = "rotate(180deg)";
    downArrow.style.transition = "transform 0.3s ease"; // Плавный переход для стрелки

}); 

// Закрытие модального окна при клике вне его
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        downArrow.style.transform = "rotate(0deg)"; // Показать стрелку вниз при закрытии
    }
});