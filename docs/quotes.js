
async function getQuote() {
    const response = await fetch('quotes.json');
    const quotes = await response.json();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

async function updateQuote(quote) {
    const quoteContainer = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');

    if (quote) {
        // Assuming quote has text and author properties
        quoteContainer.textContent = quote.quote;
        quoteAuthor.textContent = quote.author;
    } else {
        quoteContainer.textContent = 'Failed to load quote';
        quoteAuthor.textContent = '';
    }
}

function shareQuote() {
    const quote = document.querySelector('.quote-text').textContent;
    const author = document.querySelector('.quote-author').textContent;
    const text = `"${quote}" - ${author}`;

    if (navigator.share) {
        navigator.share({
            title: 'Inspirational Quote',
            text: text
        });
    } else {
        navigator.clipboard.writeText(text).then(() => {
            alert('Quote copied to clipboard!');
        });
    }
}

async function newQuote() {

    const randomQuote = (await getQuote())

    const quoteElement = document.querySelector('.quote-text');
    const authorElement = document.querySelector('.quote-author');

    // Fade out
    quoteElement.style.opacity = '0';
    authorElement.style.opacity = '0';

    setTimeout(() => {
        updateQuote(randomQuote);

        // Fade in
        quoteElement.style.opacity = '1';
        authorElement.style.opacity = '1';
    }, 300);
}

async function initPromo() {
// Initialize the promo banner close button
    const promoBanner = document.getElementById('promo-banner');
    const closePromoBtn = document.getElementById('close-promo-btn');

    if (promoBanner && closePromoBtn) {
        closePromoBtn.addEventListener('click', () => {
            promoBanner.style.display = 'none';
        });
    }
}

// Load quote when page loads
document.addEventListener('DOMContentLoaded', newQuote);
document.addEventListener('DOMContentLoaded', initPromo);

// Add click handler to button
document.getElementById('new-quote-btn').addEventListener('click', newQuote);
