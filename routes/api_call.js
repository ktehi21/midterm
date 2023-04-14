const fetch = require('node-fetch');
const { google } = require('googleapis');
const amazon = require('amazon-product-api');
// const yelp = require('yelp-fusion');
const config = require('./config.json');

// need to install
// npm install google-auth-library googleapis
// npm install amazon-product-api

/*
  break 3 differents function
  do not use async!!
  use promise.then

  After break down 3 different function
  this export to category-decision.js
  in category-decision we can make sure the category then export the categoryDecision to get_todo.js
  in get_todo.js GET the word, user typed.
  then call categoryDecision

*/


// API KEYs
const YELP_API_KEY = yelp_api_key;
const prodAdv = amazon.createClient({
  awsId: config.aws.accessKeyId,
  awsSecret: config.aws.secretAccessKey,
  awsTag: config.aws.associateTag
});
const GOOGLE_BOOKS_API_KEY = google_books_api_key;
const books = google.books('v1');


// Amazon API
// const fetchAmazon = function (word) {
//   const amazonPromise = new Promise((resolve, reject) => {
//     prodAdv.itemSearch({
//       SearchIndex: 'All',
//       Keywords: word,
//       ResponseGroup: 'ItemAttributes,Offers'
//     }, (err, result) => {
//       if (err) {
//         reject(err);
//         return
//       }
//       if (result && result.Items && result.Items.Item && result.Items.Item.length > 0) {
//         resolve('BUY');
//         return
//       }
//       resolve();
//     });
//   });

//   return amazonPromise;
// }

// // Yelp API - EAT
const fetchYelp = function (word) {
  const yelpPromise = fetch(`https://api.yelp.com/v3/businesses/search?location=Vancouver&term=${word}&categories=restaurants`, { headers: { Authorization: `Bearer ${YELP_API_KEY}` } })
    .then(res => res.json())
    .then(json => {
      // Check if any of the returned businesses have a name that matches the search term
      const matchingBusiness = json.businesses.find(business => business.name.toLowerCase().includes(word.toLowerCase()));
      if (matchingBusiness) {
        // console.log("business: ", matchingBusiness);
        return 'EAT';
      }
      // Return a resolved promise with null if no matching businesses are found
      return null;
    });
  return yelpPromise
}

// OMDb API - WATCH
const fetchMovie = function (word) {
  const moviePromise = fetch(`http://www.omdbapi.com/?t=${word}&apikey=69364abe`)
      .then(res => res.json())
      .then(json => {
        if (json.Title.length > 0) {
          return 'WATCH';
        }
        // Return a resolved promise with null if no movie is found
        return null;
      });

    return moviePromise
}

// // Google Books API - READ
const fetchBooks = function (word) {
  const booksPromise = fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${word}`)
    .then(res => res.json())
    .then(json => {
      if (json.items && json.items.length > 0) {
        return 'READ';
      }
      // Return a resolved promise with null if no books are found
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

  try {
    const [yelpResult, movieResult, booksResult] = await Promise.all([
      fetchYelp(word),
      fetchMovie(word),
      fetchBooks(word)
    ]);
console.log("뭘까",yelpResult, movieResult, booksResult);
    if (yelpResult) {
      // console.log("음식: ", yelpResult);
      return yelpResult;
    }
    if (movieResult) {
      // console.log("영화: ", movieResult);
      return movieResult;
    }
    if (booksResult) {
      // console.log("책: ", booksResult);
      return booksResult;
    }
  } catch (error) {
    console.log(error.message);
  }

  // If none of the results are defined or truthy, return 'BUY'
  return 'BUY';
}




// classifyWord('parasite')
//   .then(result => {
//     console.log("결과: ", result);
//   });

module.exports = { classifyWord };
