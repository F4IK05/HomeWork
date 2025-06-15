// pagination
let allArticles = []; // массив из статьей
let currentPage = 1;
let articlePerPage = 4;


// В HTML(main.html), к каждой ссылке(<a>) добавил атрибут data-category(с ним работает News API).
// В News API есть несколько категории(их я написал к каждой ссылке)
document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        // Здесь я беру содержимое атрибута data-category у каждой ссылки
        const category = link.getAttribute('data-category');

        fetchCategoryNews(category);
    })
});

// Функция для получения новостей по категориям
function fetchCategoryNews(category) {
    const API_key = 'apiKey=adb1151f8f244e8db0d8577b7d0302fd';

    // По этой ссылке я получаю свежие(top-headlines) новости по определенной категории
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&${API_key}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        // После успешного получения данных передаю в функцию renderMainNews
        renderMainNews(data.articles);
    })
    .catch(error => {
        console.error(error)
    });
}

// Функция для получения информации которую мы видим при заходе
function fetchMainNews() {
    const API_key = 'apiKey=adb1151f8f244e8db0d8577b7d0302fd';

    const query = 'news';

    // Сортировка по популярности
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=popularity&${API_key}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {

       renderMainNews(data.articles)

    })
    .catch(error => {
        console.error(error)
    });
}

// Функция для получения самой ноыой информации, которую мы видим в sidebar-е
function fetchLatestNews() {
    const API_key = 'apiKey=adb1151f8f244e8db0d8577b7d0302fd';

    const url = `https://newsapi.org/v2/top-headlines?country=us&sortby=publeshedAt&${API_key}`;

    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        // Получаю первый 5
        renderOtherNews(data.articles.slice(0,5))

    })
    .catch(error => {
        console.error(error)
    });
}

// Функция по отрисовке информации на главном экране
function renderMainNews(articles, page = 1) {
    const container = document.querySelector('.main-news-container');

    allArticles = articles;
    currentPage = page;

    const start = (page - 1) * articlePerPage;
    const end = start + articlePerPage;

    const articleToShow = allArticles.slice(start, end);

    container.innerHTML = '';

    articleToShow.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';

        card.innerHTML = `
            <a href="${article.url}" target="_blank"><h2>${article.title}</h2></a>
            <a href="${article.url}" target="_blank">${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image"/>` : ''}</a>
            <p>${article.description || ''}</p>
            <span>${new Date(article.publishedAt).toLocaleString()}</span>
        `;

        container.appendChild(card);
    })

    renderPagButtons();
};

// Функция по отрисовке кнопок переключения страниц
function renderPagButtons() {
    const pagBtns = document.querySelector('.pag-btns');

    const totalPage = Math.ceil(allArticles.length/articlePerPage);

    pagBtns.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'pag-btn';

    prevBtn.textContent = '< Prev';

    if (currentPage == 1) {
        prevBtn.disabled = true;
    }

    prevBtn.addEventListener('click', (event) => {
        event.preventDefault();

        renderMainNews(allArticles, currentPage - 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    pagBtns.appendChild(prevBtn);

    for (let i = 1; i <= totalPage; i++) {
        const btn = document.createElement('button');
        btn.className = 'pag-btn';
        
        btn.textContent = i;

        if (i == currentPage) {
            btn.disabled = true;
        }

        btn.addEventListener('click', (event) => {
            event.preventDefault();

            currentPage = i;
            renderMainNews(allArticles, currentPage);

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        })

        pagBtns.appendChild(btn)
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'pag-btn';

    nextBtn.textContent = 'Next >';

    if (currentPage == totalPage) {
        nextBtn.disabled = true;
    }

    nextBtn.addEventListener('click', (event) => {
        event.preventDefault();

        renderMainNews(allArticles, currentPage + 1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    pagBtns.appendChild(nextBtn);
}

// Функция по отрисовке информации в side-bar-е 
function renderOtherNews(articles) {
    const list = document.querySelector('.latest-news-list');

    articles.forEach(article => {
        const li = document.createElement('li');
        li.className = 'last-news-card';

        li.innerHTML = `
            <a href="${article.url}" target="_blank">
                <h3>${article.title}</h3>
                <p>${article.description || ''}</p>
            </a>
        `;

        list.appendChild(li)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLatestNews(), 
    fetchMainNews()});