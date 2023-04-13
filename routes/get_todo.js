//get, post
const express = require('express');
const router  = express.Router();
const todoQueries = require('../db/queries/todo_data');
const {categoryDecision} = require('./category-decision');

router.post('/', (req, res) => {
  const word = req.body.task;
  // console.log("get todo", word);
  categoryDecision(word)
  .then(data => {
    // console.log(data);
    res.json({data})
  })
  .catch(err => console.log("getTodo, error", err.message));
});



module.exports = router;

