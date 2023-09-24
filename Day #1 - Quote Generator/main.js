const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote-text');
const authorText = document.querySelector('.author-name');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes;

// Loading Spinner Show
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove loading spinner
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new quote
function newQuote() {
  loading();
  const quote = apiQuotes;
  // console.log(quote);
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.quote.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  quoteText.textContent = quote.quote;
  complete();
}

// Get quote from api
async function getQuotes() {
  loading();
  const url = `https://dummyjson.com/quotes/random`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Request Failed!');
    }
    apiQuotes = await res.json();
    // console.log(apiQuotes);
    newQuote();
  } catch (error) {}
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
