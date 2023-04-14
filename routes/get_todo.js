//get, post
const express = require('express');
const router  = express.Router();
const { getTodo } = require('../db/queries/todo_data');
const {categoryDecision} = require('../public/scripts/helper/category-decision');

router.post('/', (req, res) => {
  const word = req.body.task;
  categoryDecision(word)
  .then(data => {
    res.json({response: "successfully inserted"})
  })
  .catch(err => console.log("error 1", err.message));
});

router.get('/', (req, res) => {
  getTodo()
  .then(data => {
    res.json(data)
  })
  .catch(err => console.log("error 2", err.message));
});

module.exports = router;

