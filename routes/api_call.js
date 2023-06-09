const axios = require('axios');
const { google } = require('googleapis');
const aws = require('aws-lib');

// API KEYs


const books = google.books('v1');

// Amazon API
const fetchAmazon = function(word) {
  const amazonPromise = new Promise((resolve, reject) => {
    prodAdv.call('ItemSearch', {
      SearchIndex: 'All',
      Keywords: word,
      ResponseGroup: 'ItemAttributes,Offers'
    }, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (result.Items && result.Items.Item && result.Items.Item.length > 0) {
        resolve('BUY');
        return;
      }
      resolve();
    });
  });

  return amazonPromise;
}

// Yelp API
const fetchYelp = function(word) {
  const yelpPromise = axios({
    method: 'get',
    url: `https://api.yelp.com/v3/businesses/search?term=${word}&location=Vancouver&categories=restaurants`,
    headers: { Authorization: `Bearer ${YELP_API_KEY}` } })
    .then(res => res.json())
    .then(json => {
      if (json.businesses.length > 0) {
        return 'EAT';
      }
      // Return a resolved promise with null if no businesses are found
      return null;
    });

  return yelpPromise;
};

// Google Books API
const fetchBooks = function(word) {
  const booksPromise = books.volumes.list({
    q: `intitle:${word}`,
    key: GOOGLE_BOOKS_API_KEY
  })
    .then(res => {
      const { data } = res;
      if (data.items && data.items.length > 0) {
        return 'READ';
      }
      return null;
    });

  return booksPromise;
};


// code start
async function classifyWord(word) {
  if (!word) {
    return '';
  }

  let category = '';

  return Promise.all([fetchAmazon(word), fetchYelp(word), fetchBooks(word)])
    .then(all => {
      const amazonResult = all[0];
      const yelpResult = all[1];
      const booksResult = all[2];
      if (amazonResult) {
        return amazonResult;
      }
      if (booksResult) {
        return booksResult;
      }
      if (yelpResult) {
        return yelpResult;
      }
    })
    .catch(err => {
      console.log(err.messege);
    });

  return null;
}


module.exports = { classifyWord };
