async function fetchNews() {
    const API_key = 'apiKey=adb1151f8f244e8db0d8577b7d0302fd';
    const url = `https://newsapi.org/v2/top-headlines?country=us&${API_key}`;

    
    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        renderNews(data.articles)
    })
    .catch(error => {
        console.error(error)
    });
    

}

function renderNews(articles) {
    const container = document.querySelector('.news-container');

    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';

        card.innerHTML = `
            <h2>${article.title}</h2>
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image"/>` : ''}
            <p>${article.description || ''}</p>
            <a href="${article.url}" target="_blank">More</a>
            <span>${article.publishedAt}</span>
        `;

        container.appendChild(card)
    });
}

document.addEventListener('DOMContentLoaded', fetchNews);