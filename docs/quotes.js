
let stories = [];
let currentStoryIndex = 0;

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

async function loadStories() {
    try {
        const response = await fetch('stories.json');
        stories = await response.json();
        updateStoryUI();
    } catch (e) {
        console.error("Failed to load stories", e);
    }
}

function updateStoryUI() {
    const storyTitle = document.getElementById('story-title');
    const storyLink = document.getElementById('story-link');
    
    if (stories.length > 0) {
        const story = stories[currentStoryIndex];
        storyTitle.textContent = story.title;
        storyLink.href = story.url;
    }
}

function nextStory(event) {
    if (event) event.stopPropagation();
    currentStoryIndex = (currentStoryIndex + 1) % stories.length;
    updateStoryUI();
}

function toggleStoryPill(event) {
    const pill = document.getElementById('story-pill');
    // If the click is on the "Read More" link or "Next" button, don't toggle
    if (event.target.closest('#story-link') || event.target.closest('#next-story-btn')) {
        return;
    }
    pill.classList.toggle('expanded');
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

function getYouTubeEmbedUrl(url) {
    let videoId = '';
    const urlObj = new URL(url);

    if (urlObj.hostname.includes('youtube.com')) {
        if (urlObj.pathname.includes('/shorts/')) {
            videoId = urlObj.pathname.split('/shorts/')[1].split('/')[0];
        } else {
            videoId = urlObj.searchParams.get('v');
        }
    } else if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
    }

    // Use youtube-nocookie.com for better privacy and Safari compatibility
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1` : null;
}

async function showPost() {
    const post = await getPost();
    const postContent = document.getElementById('post-content');
    const postContainer = document.getElementById('post-container');
    const mainContainer = document.querySelector('.container');

    const embedUrl = getYouTubeEmbedUrl(post.url);

    if (embedUrl) {
        postContent.innerHTML = `
            <iframe 
                width="100%" 
                height="580" 
                src="${embedUrl}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            </iframe>
        `;
    } else {
        // Fallback for Instagram if you keep some
        postContent.innerHTML = `
            <blockquote class="instagram-media" data-instgrm-permalink="${post.url}" data-instgrm-version="14">
                <a href="${post.url}" target="_blank">View on Instagram</a>
            </blockquote>
        `;
        if (window.instgrm) window.instgrm.Embeds.process();
    }

    postContainer.classList.add('open');
    mainContainer.classList.add('shifted');
}

function hidePost() {
    const postContainer = document.getElementById('post-container');
    const mainContainer = document.querySelector('.container');
    const postContent = document.getElementById('post-content');
    
    postContainer.classList.remove('open');
    mainContainer.classList.remove('shifted');
    
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
    loadStories();

    document.getElementById('new-quote-btn').addEventListener('click', newQuote);
    document.getElementById('show-post-btn').addEventListener('click', showPost);
    document.getElementById('close-post-btn').addEventListener('click', hidePost);
    
    document.getElementById('story-pill').addEventListener('click', toggleStoryPill);
    document.getElementById('next-story-btn').addEventListener('click', nextStory);
});
