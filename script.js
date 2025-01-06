let allArticles = [];
let currentPage = 1;
const articlesPerPage = 5;
let filteredArticles = [];

function fetchArticles() {
    fetch('data.html')
        .then(response => response.text())
        .then(data => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;

            const articles = tempDiv.querySelectorAll('.article');
            allArticles = [...articles];
            filteredArticles = [...allArticles];
            displayArticles();
        })
        .catch(error => console.error('Error fetching articles:', error));
}

function displayArticles() {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = currentPage * articlesPerPage;
    const pageArticles = filteredArticles.slice(startIndex, endIndex);

    const articlesContainer = document.querySelector('.articles');
    articlesContainer.innerHTML = '';

    pageArticles.forEach((article, index) => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');
        const title = document.createElement('h2');
        title.innerHTML = `<a href="article.html?title=${article.getAttribute('data-title')}">${article.getAttribute('data-title')}</a>`;
        const content = document.createElement('p');
        content.textContent = article.getAttribute('data-content');

        articleDiv.appendChild(title);
        articleDiv.appendChild(content);

        if ((index + 1) % 3 === 0) {
            const adDiv = document.createElement('div');
            adDiv.classList.add('ad');
            adDiv.textContent = "Advertisement";
            articlesContainer.appendChild(adDiv);
        }

        articlesContainer.appendChild(articleDiv);
    });

    document.querySelector('.page-number').textContent = `Page ${currentPage}`;
    updatePaginationButtons();
}

function updatePaginationButtons() {
    document.querySelector('.prev-page').disabled = currentPage === 1;
    document.querySelector('.next-page').disabled = currentPage * articlesPerPage >= filteredArticles.length;
}

function changePage(direction) {
    currentPage += direction;
    displayArticles();
}

function filterByTag(tag) {
    filteredArticles = allArticles.filter(article => {
        const tags = article.getAttribute('data-tag').split(','); // Split tags into an array
        return tags.includes(tag); // Check if the desired tag exists
    });
    currentPage = 1;
    displayArticles();
}

function showAll() {
    filteredArticles = [...allArticles];
    currentPage = 1;
    displayArticles();
}

window.onload = fetchArticles;
