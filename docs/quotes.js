const numberOfQuotes = 50;

async function getQuote() {
    try {
        const response = await fetch('/api/quotes?id=eq.'+(Math.floor(Math.random()*numberOfQuotes)));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const quote = await response.json();
        return quote[0];
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
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


// Load quote when page loads
document.addEventListener('DOMContentLoaded', newQuote);

// Add click handler to button
document.getElementById('new-quote-btn').addEventListener('click', newQuote);
