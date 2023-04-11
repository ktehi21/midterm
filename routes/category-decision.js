// This will be replaced by each API we are actually going to use:
const {
  checkYelp,
  checkIMDB,
  checkBookWebsite,
  checkGoogle
} = require("./api-calls");

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
    category = "eat"
  }

  if (
    lowerCaseTask.includes("watch") ||
    lowerCaseTask.includes("movie") ||
    lowerCaseTask.includes("film") ||
    lowerCaseTask.includes("tv")
  ) {
    category = "watch";
  }

  if (
    lowerCaseTask.includes("read") ||
    lowerCaseTask.includes("book") ||
    lowerCaseTask.includes("journal") ||
    lowerCaseTask.includes("novel") ||
    lowerCaseTask.includes("textbook")
  ) {
    category = "read";
  }

  if (
    lowerCaseTask.includes("buy") ||
    lowerCaseTask.includes("store") ||
    lowerCaseTask.includes("retail") ||
    lowerCaseTask.includes("grocer") ||
    lowerCaseTask.includes("purchase")
  ) {
    category = "buy";
  }
  return category;
}


//Function which is the decision engine for the category of the query. It initially looks through *whatever API we got:

const categoryDecision = () => {
  //Check for obvious keywords
  //If obvious keywords fail, start calling APIs
  let category = null;
  category = simpleTaskCheck(taskString);

  if (category) {
    return category;
  } else {
    //Time to start querying the API's
    return checkBookWebsite(taskString).then((response) => {
      if (response.includes("Book") ||
          response.includes("FictionalCharacter")) {
        //add to read
        category = "read";
        return category;
      } else if (
        response.includes("Movie") ||
        response.includes("TelevisionProgram")
      ) {
        category = "watch";
        return category;
      } else if (
        response.includes("Consumer") ||
        response.includes("Invention")
      ) {
        //add to buy
        category = "buy";
        return category;
      } else if (response.includes("RetailLocation")) {
        //add to eat
        category = "eat";
        return category;
      } else {
        //cannot categorize - try Google maybe?
        return checkGoogle(taskString).then((responseGoogle) => {
          if (responseGoogle) {
            //function call to 'read abstract'
            category = simpleTaskCheck(responseGoogle);
            return category;
          } else {
            return checkYelp(taskString).then((responseYelp) => {
              if (responseYelp) {
                category = "eat";
                return category;
              } else {
                //if absolutely none of the API's work, then we return null
              }
                return null;
            });
          }
        });
      }
    });
  }
};

module.exports = {categoryDecision};
