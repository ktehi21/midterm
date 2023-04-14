//get, post
const express = require('express');
const router  = express.Router();
const { getTodo } = require('../db/queries/todo_data');
const {categoryDecision} = require('./category-decision');

router.post('/', (req, res) => {
  const word = req.body.task;
  console.log("get todo", word);
  categoryDecision(word)
  .then(data => {
    console.log("Success", data);
    res.json({response: "successfully inserted"})
  })
  .catch(err => console.log("getTodo1, error", err.message));
});

router.get('/', (req, res) => {
  getTodo()
  .then(data => {
    console.log(data);
    res.json(data)
  })
  .catch(err => console.log("getTodo2, error", err.message));
});

module.exports = router;

