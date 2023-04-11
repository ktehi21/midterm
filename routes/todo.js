//get, post
const express = require('express');
const router  = express.Router();
const todoQueries = require('../db/queries/todo');

router.get('/', (req, res) => {
  todoQueries.getTodo()
  .then(data => res.json(data))
  .catch(err => console.log("getTodo, error", err));
});



module.exports = router;

// browser render index.ejs -> DOM render on  the page ->
// app.js -> document ready inside code run -> makes ajax request
// query function from data table
// app.js
// todo.js : get ->
