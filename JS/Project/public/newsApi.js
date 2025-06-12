function fetchMainNews() {
    const API_key = 'apiKey=adb1151f8f244e8db0d8577b7d0302fd';
    const fromDate = '2025-05-11';
    const query = 'news';
    const url = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=popularity&${API_key}`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        const articles = data.articles;

       renderMainNews(articles)

    })
    .catch(error => {
        console.error(error)
    });
}


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
        const articles = data.articles;

        renderOtherNews(articles.slice(0,5))

    })
    .catch(error => {
        console.error(error)
    });
}

function renderMainNews(articles) {
    const container = document.querySelector('.main-news-container');

    articles.forEach(article => {
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
};


function renderOtherNews(articles) {
    const list = document.querySelector('.latest-news-list');

    articles.forEach(article => {
        const li = document.createElement('li');
        li.className = 'last-news-card';

        li.innerHTML = `
            <a href="${article.url}" target="_blank">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            </a>
        `;

        list.appendChild(li)
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchLatestNews(), 
    fetchMainNews()});