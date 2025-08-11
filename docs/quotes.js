const numberOfQuotes = 50;

const supabase = supabase.createClient(
    'https://ltelhtkzlonffgpkymjp.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZWxodGt6bG9uZmZncGt5bWpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MDkxODUsImV4cCI6MjA3MDQ4NTE4NX0.QUCjvnJPd6IbaalQTn8hhAxi31l-GHX2uqHfXlZaR84'
)

async function getQuote() {
    const quoteId = Math.floor(Math.random()*numberOfQuotes)
    const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .eq('id', quoteId)
        .single()  // Returns single object instead of array

    if (error) {
        console.error('Error loading quote:', error)
        return null
    }

    return data

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
