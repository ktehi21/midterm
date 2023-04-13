const db = require('../connection');

const getTodo = () => {
  return db.query('SELECT * FROM todo_items;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getTodo };
