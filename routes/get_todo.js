//get, post
const express = require('express');
const router  = express.Router();
const todoQueries = require('../db/queries/todo_data');
const {categoryDecision} = require('./category-decision');

router.get('/:word', (req, res) => {
  const word = req.params.word;
  console.log("get todo", word);
  categoryDecision(word)
  .then(data => {
    console.log(data);
    res.json(data)
  })
  .catch(err => console.log("getTodo, error", err.message));
});



module.exports = router;

