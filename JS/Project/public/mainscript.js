const categories = document.querySelector('.categories');
const mobileCategories = document.querySelector('.mobile-categories');
const dropdownArrow = document.querySelector('.dropdown-arrow');

const activeCategory = document.querySelectorAll('.cat li a');
const currentTopic = document.querySelector('.mobile-categories a');


activeCategory.forEach(category => {
    category.addEventListener('click', (event) => {
        event.preventDefault();

        // убираем у всех
        activeCategory.forEach(cat => cat.classList.remove('active'));

        // добавляем к выбранному
        category.classList.add('active');

        // меняем текст на выбранную категорию
        currentTopic.textContent = category.textContent;

        // закрываем dropdown после выбора 
        categories.classList.remove('open');
        dropdownArrow.style.transform = 'rotate(0deg)';
    });
})


// Переключение выпадающего списка(аддаптивность)
mobileCategories.addEventListener('click', () => {
    categories.classList.toggle('open');
    
    dropdownArrow.style.transform = 'rotate(180deg)';
    if (!categories.classList.contains('open')) {
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
});

// Закрытие выпадающего списка при клике вне их
window.addEventListener('click', (event) => {
    const target = event.target;
    if (!categories.contains(target)) {
        categories.classList.remove('open');
        dropdownArrow.style.transform = 'rotate(0deg)';
    }
});
