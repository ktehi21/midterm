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

const removeTask = function(taskLocation, db) {
  const queryCommand = `DELETE FROM todo-items WHERE id = $1`;
  return db.query(queryCommand, taskLocation)
    .then(res => res.rows[0])
    .catch(err.message);
};

//delete route for task/todo-items
router.delete("/:taskLocation", (req, res) => {
  const taskLocation = req.params.taskLocation;
  removeTask(taskLocation, db)
    .then(task => {
      res.send(task);
    })
    .catch(err.message);
});

module.exports = router;

