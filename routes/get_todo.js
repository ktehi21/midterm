//get, post
const express = require('express');
const router  = express.Router();
const todoQueries = require('../db/queries/todo_data');

router.get('/', (req, res) => {
  todoQueries.getTodo()
  .then(data => res.json(data))
  .catch(err => console.log("getTodo, error", err));
});



module.exports = router;

// browser render 'index.ejs': DOM render on the page /
// while it render 'scripts/app.js' called ->
// document.ready make it wait until DOM fully render:
// after that 'scripts/app.js' codes are run ->
// makes ajax get request to 'route/todo.js' ->
// 'route/todo.js' request json data from 'queries/todo_data.js' ->
// 'queries/todo_data.js' function brings data from table ->
// send data to 'route/todo.js' =
// 'route/todo.js' received data from 'queries/todo_data.js' ->
// 'scripts/app.js' response

// When you use psql LOGIN AS LABBER!!!!
// psql -U labber -W midterm
