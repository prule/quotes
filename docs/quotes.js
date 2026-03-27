
async function getQuote() {
    const response = await fetch('quotes.json');
    const quotes = await response.json();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

async function getPost() {
    const response = await fetch('posts.json');
    const posts = await response.json();
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
}

async function updateQuote(quote) {
    const quoteContainer = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (quote) {
        quoteContainer.textContent = quote.quote;
        quoteAuthor.textContent = quote.author;
    } else {
        quoteContainer.textContent = 'Failed to load quote';
        quoteAuthor.textContent = '';
    }
}

async function newQuote() {
    const randomQuote = await getQuote();
    const quoteElement = document.querySelector('.quote-text');
    const authorElement = document.querySelector('.quote-author');

    quoteElement.style.opacity = '0';
    authorElement.style.opacity = '0';

    setTimeout(() => {
        updateQuote(randomQuote);
        quoteElement.style.opacity = '1';
        authorElement.style.opacity = '1';
    }, 300);
}

async function showPost() {
    const post = await getPost();
    const postContent = document.getElementById('post-content');
    const postContainer = document.getElementById('post-container');
    const mainContainer = document.querySelector('.container');

    let embedUrl = post.url;
    
    // Format Instagram URLs for embedding
    if (embedUrl.includes('instagram.com')) {
        // Ensure trailing slash and add /embed/
        if (!embedUrl.endsWith('/')) embedUrl += '/';
        embedUrl += 'embed/';
    } 
    // Format YouTube Shorts URLs for embedding
    else if (embedUrl.includes('youtube.com/shorts/')) {
        embedUrl = embedUrl.replace('youtube.com/shorts/', 'youtube.com/embed/');
    }

    postContent.innerHTML = `
        <iframe 
            src="${embedUrl}" 
            width="320" 
            height="580" 
            frameborder="0" 
            scrolling="no" 
            allowtransparency="true" 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
        </iframe>
    `;

    postContainer.classList.add('open');
    mainContainer.classList.add('shifted');
}

function hidePost() {
    const postContainer = document.getElementById('post-container');
    const mainContainer = document.querySelector('.container');
    const postContent = document.getElementById('post-content');
    
    postContainer.classList.remove('open');
    mainContainer.classList.remove('shifted');
    
    // Clear content to stop any playing videos
    setTimeout(() => {
        postContent.innerHTML = '';
    }, 300);
}

async function initPromo() {
    const promoBanner = document.getElementById('promo-banner');
    const closePromoBtn = document.getElementById('close-promo-btn');

    if (promoBanner && closePromoBtn) {
        closePromoBtn.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    newQuote();
    initPromo();

    document.getElementById('new-quote-btn').addEventListener('click', newQuote);
    document.getElementById('show-post-btn').addEventListener('click', showPost);
    document.getElementById('close-post-btn').addEventListener('click', hidePost);
});
