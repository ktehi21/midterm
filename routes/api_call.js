const fetch = require('node-fetch');
const {google} = require('googleapis');
const aws = require('aws-lib');
// need to install
// npm install google-auth-library googleapis
// npm install aws-lib

// API KEYs

const books = google.books('v1');

// code start
async function classifyWord(word) {
  if (!word) {
    return '';
  }

  let category = '';
  try {

    // Amazon API
    const amazonPromise = new Promise((resolve, reject) => {
      prodAdv.call('ItemSearch', {
        SearchIndex: 'All',
        Keywords: word,
        ResponseGroup: 'ItemAttributes,Offers'
      }, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result); // log the result to the console
          if (result.Items && result.Items.Item && result.Items.Item.length > 0) {
            resolve('BUY');
          } else {
            resolve();
          }
        }
      });
    });

    // Yelp API
    const yelpPromise = fetch(`https://api.yelp.com/v3/businesses/search?term=${word}&location=Vancouver&categories=restaurants`, { headers: { Authorization: `Bearer ${YELP_API_KEY}` } })
      .then(res => res.json())
      .then(json => {
        if (json.businesses.length > 0) {
          return 'EAT';
        }
        // Return a resolved promise with null if no businesses are found
        return Promise.resolve(null);
      });

    // Google Books API
    const booksPromise = books.volumes.list({
      q: `intitle:${word}`,
      key: GOOGLE_BOOKS_API_KEY
    })
      .then(res => {
        const { data } = res;
        if (data.items && data.items.length > 0) {
          return 'READ';
        }
      });

      const [amazonResult, yelpResult, booksResult] = await Promise.all([amazonPromise, yelpPromise, booksPromise]);

      if (amazonResult) {
        return amazonResult;
      }
      if (booksResult) {
        return booksResult;
      }
      if (yelpResult) {
        return yelpResult;
      }


  } catch (err) {
    console.error(err);
  }
  return null;
}
console.time('classifyWord');
classifyWord('Nene Chicken')
.then(category => {
  console.log(category);
  console.timeEnd('classifyWord')});

module.exports = { classifyWord };

