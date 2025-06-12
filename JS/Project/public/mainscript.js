const dropdown = document.querySelector('.categories');
const toggle = document.querySelector('.active-cat');
const dropdownArrow = document.querySelector('.dropdown-arrow');
const searchField = document.querySelector('#searchField');
const searchBtn = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#searchInput');

const activeCategory = document.querySelectorAll('.cat li a');

activeCategory.forEach(category => {
    category.addEventListener('click', () => {
        // убираем у всех
        activeCategory.forEach(cat => cat.classList.remove('active'));

        category.classList.add('active');
    });
})


// Переключение выпадающего списка(аддаптивность)
toggle.addEventListener('click', () => {
    dropdown.classList.toggle('open');
    
    const currentTopic = document.querySelector('.active-cat a');

    dropdownArrow.style.transform = 'rotate(180deg)';
    if (!dropdown.classList.contains('open')) {
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
});

// Закрытие выпадающего списка и поля поиска при клике вне их
window.addEventListener('click', (event) => {
    const target = event.target;
    if (!dropdown.contains(target)) {
        dropdown.classList.remove('open');
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
    if (!searchField.contains(target) && !searchBtn.contains(target)) {
        searchField.classList.remove('active');
    }
});

// Открытие/закрытие поиска по клику
searchBtn.addEventListener('click', () => {
    if (searchField.classList.contains('active')) {
        searchField.classList.remove('active');
    }
    else {
        searchField.classList.add('active');
        searchInput.focus();
    }
});
