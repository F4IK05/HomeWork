const username = localStorage.getItem('username');
const displayUsername = document.getElementById('usernameDisplay');

const signOutButton = document.getElementById('signOutButton');

const API_KEY = ''; // API-key

let allCities = []; // Массив для хранения всех городов
let currentPage = 1; // Текущая страница
let citiesPerPage = 5; // Количество городов на странице


// Отображение имени пользователя, если оно есть
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
    downArrow.style.transition = "transform 0.3s ease";

}); 

// Закрытие модального окна при клике вне его
window.addEventListener("click", function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        downArrow.style.transform = "rotate(0deg)";
    }
});

changeMyLocBtn.addEventListener('click', function() {
    window.location.href = '../location/location.html';
});

signOutButton.addEventListener('click', function() {
    window.location.href = '../index.html'
})

// Получение погоды
function getCitiesWeather(lat, lng) {
    // cnt - количество городов, которые нужно вернуть(я не понял как сделать так чтобы возвращались города в пределах 100км)
    let API_URL = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lng}&cnt=30&appid=${API_KEY}&units=metric`;

    // Запрос к API OpenWeatherMap для получения погоды в близлежащих городах
    fetch(API_URL).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        console.log(data);
        allCities = data.list; // Сохраняем все города в массиве
        currentPage = 1; 
        renderPage(currentPage);
        renderButtons();

    }).catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Отображение страницы(5 городов на странице)
function renderPage(page) {
    const container = document.getElementById('weatherContainer');
    const start = (page - 1) * citiesPerPage; // Начальный индекс для среза массива
    const end = start + citiesPerPage; // Конечный индекс для среза массива

    const citiesToShow = allCities.slice(start, end); // Срез массива для текущей страницы

    // Отображение информации о городах
    container.innerHTML = `
        <div class="cityList">
            <h2>Weather in Nearby Cities</h2>
            ${citiesToShow.map(city => `
                <div class="city">
                    <h3>${city.name}</h3>
                    <p>Temperature: ${city.main.temp} °C</p>
                    <p>Weather: ${city.weather[0].description}</p>
                    <p>Humidity: ${city.main.humidity}%</p>
                    <img src="http://openweathermap.org/img/wn/${city.weather[0].icon}.png" alt="${city.weather[0].description}" />
                </div>
            `).join('')}
        </div>
    `;
}

// Функция для создания кнопок навигации по страницам(пагинация)
function renderButtons() {
    const container = document.getElementById('pageBtns');

    const totalPages = Math.ceil(allCities.length / citiesPerPage);

    container.innerHTML = ''; // Очистка контейнера(потому что при каждом вызове функции мы будем перерисовывать кнопки, а они добавляются в конец к существующим кнопкам)

    // Создание кнопок для каждой страницы
    for(let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button'); 
        button.className = 'pageBtn';
       
        button.textContent = i;

        // Если это текущая страница, то кнопка будет неактивной
        if (i == currentPage) {
            button.disabled = true;
        }
        
        // Добавление обработчика события для кнопки
        button.addEventListener('click', function() {
            currentPage = i;
            renderPage(currentPage);
            renderButtons();
        });

        container.appendChild(button);
    }
}

// Функция для загрузки местоположения пользователя по имени пользователя
function loadUserLocation(username) {
    fetch('/users.json').then(response => {  
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(users => {
        const user = users.find(u => u.username === username);
        if (user && user.location) {
            const { lat, lng } = user.location;
            getCitiesWeather(lat, lng);
        } else {
            console.error('User location not found');
        }
    });
}

loadUserLocation(username)