const axios = require('axios');
const db = require('./connection'); // psql connect

const CATEGORIES = {
  TO_EAT: 1,
  TO_WATCH: 2,
  TO_BUY: 3,
  TO_READ: 4,
};

async function getCategoryFromAPI(keyword) {
  try {
    // Google Books API
    const bookResult = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
    const bookTitle = bookResult.data.items[0].volumeInfo.title;
    const bookAuthor = bookResult.data.items[0].volumeInfo.authors[0];

    // Rotten Tomatoes API
    const movieResult = await axios.get(`https://www.rottentomatoes.com/api/private/v2.0/search?q=${bookTitle} ${bookAuthor}&limit=1&type=movie`);
    const movieTitle = movieResult.data.movies[0].name;

    // Amazon API
    const amazonResult = await axios.get(`https://api.rainforestapi.com/request?api_key=YOUR_API_KEY&amazon_domain=amazon.com&search_term=${movieTitle}&sort_by=price_low_to_high`);
    const productName = amazonResult.data.search_results[0].title;

    // Wolfram Alpha API
    const wolframResult = await axios.get(`http://api.wolframalpha.com/v2/query?input=${productName}&appid=YOUR_APP_ID`);
    const category = wolframResult.data.queryresult.pods[0].subpods[0].plaintext;


    switch (category) {
      case 'Food':
        return CATEGORIES.TO_EAT;
      case 'Movie':
        return CATEGORIES.TO_WATCH;
      case 'Item':
        return CATEGORIES.TO_BUY;
      case 'Book':
        return CATEGORIES.TO_READ;
      default:
        return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
