const db = require('../connection');

const getTodo = () => {
  return db.query('SELECT * FROM todo_items;')
    .then(data => {
      return data.rows;
    });
};

async function saveTodoList(todoData) {
  const client = await db.connect();
  const { user_id, category, title, post_date, complete } = todoData;
  console.log(todoData);
  try {
    const categoryId = await client.query("SELECT id FROM categories WHERE category = $1;", [category]);
    console.log("CategoryID query file", categoryId);
    return client.query("INSERT INTO todo_items (user_id, category_id, title, post_date, complete) VALUES ($1, $2, $3, $4, $5) RETURNING *;", [user_id, categoryId.rows[0].id, title, post_date, complete]);
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

module.exports = { getTodo, saveTodoList };
