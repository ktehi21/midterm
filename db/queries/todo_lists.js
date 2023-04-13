const db = require('../connection');
const fetch = require("node-fetch");

const getItems = () => {
  async function searchBooks(query) {
    const url = "https://www.googleapis.com/books/v1/volumes";
    const params = { q: query };
    const response = await fetch(`${url}?${new URLSearchParams(params)}`);
    const result = await response.json();

    const books = result.items.map((item) => {
      const volumeInfo = item.volumeInfo;
      const categories = volumeInfo.categories || [];

      return { categories };
    });

    return books;
  }

  async function saveCategories(categories) {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      for (const category of categories) {
        await client.query("INSERT INTO categories(category) VALUES ($1)", [category]);
      }

      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  (async function () {
    try {
      const query = "clients";
      const books = await searchBooks(query);
      const categories = books.flatMap((book) => book.categories);
      await saveCategories(categories);

      console.log(`Saved ${categories.length} categories to the database.`);
    } catch (err) {
      console.error(err);
    } finally {
      await db.end();
    }
  })();

};

module.exports = { getItems };
