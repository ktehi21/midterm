// This will be replaced by each API we are actually going to use:
const { classifyWord } = require('../../../routes/api_call');
const { getTodo, saveTodoList } = require('../../../db/queries/todo_data');


//Functions that will look for key words in a query to categorize a task:
const simpleTaskCheck = (taskString) => {
  const lowerCaseTask = taskString.toLowerCase();
  let category = null;

  if (
    lowerCaseTask.includes("eat") ||
    lowerCaseTask.includes("food") ||
    lowerCaseTask.includes("dish") ||
    lowerCaseTask.includes("recipe") ||
    lowerCaseTask.includes("meat") ||
    lowerCaseTask.includes("vegetables") ||
    lowerCaseTask.includes("fruit") ||
    lowerCaseTask.includes("dairy") ||
    lowerCaseTask.includes("restaurant") ||
    lowerCaseTask.includes("cafe")
  ) {
    category = "EAT"
  }

  if (
    lowerCaseTask.includes("watch") ||
    lowerCaseTask.includes("movie") ||
    lowerCaseTask.includes("film") ||
    lowerCaseTask.includes("tv")
  ) {
    category = "WATCH";
  }

  if (
    lowerCaseTask.includes("read") ||
    lowerCaseTask.includes("book") ||
    lowerCaseTask.includes("journal") ||
    lowerCaseTask.includes("novel") ||
    lowerCaseTask.includes("textbook")
  ) {
    category = "READ";
  }

  if (
    lowerCaseTask.includes("buy") ||
    lowerCaseTask.includes("store") ||
    lowerCaseTask.includes("retail") ||
    lowerCaseTask.includes("grocer") ||
    lowerCaseTask.includes("purchase")
  ) {
    category = "BUY";
  }
  return category;
}


//Function which is the decision engine for the category of the query. It initially looks through *whatever API we got:

const categoryDecision = (taskString) => {
  //Check for obvious keywords
  //If obvious keywords fail, start calling APIs
  let category = null;
  category = simpleTaskCheck(taskString);

  if (category) {
    return saveTodoList({ user_id: 1, category: category, title: taskString, post_date: new Date(), complete: false });
  }

  //Time to start querying the API's

  return classifyWord(taskString)
    .then(data => {
      return saveTodoList({ user_id: 1, category: data, title: taskString, post_date: new Date(), complete: false });
    })
};


module.exports = { categoryDecision };
