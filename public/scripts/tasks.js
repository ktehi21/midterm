//sets up functions devoted to task creation and task assignment functionality

$(document).ready(function () {

  //escape func: unsafe tweets/entries containing malicious text are converted to safe text
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //form to create a new task item
  const createTaskElement = function(task) {
    const $task = $(`
      <article class="task ${task.category}" id="${task.id}>
        <p><label>
            <input type="checkbox">
            <span class="checkable"> ${escape(task.content.text)}
          </label>
        </p>
        <div class="creation-date">${timeago.format(task)}</div>
        </article>
    `);
  };

  //Submit a new task to list from submit form!
  $("#new-task-form").submit
});
