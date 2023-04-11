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
        </article>
    `);
    return $task;
  };

  const sendToList = function(task) {
    if (task.category === 'eat') {
      $(".eat.todo-list")
    }
    if (task.category === 'watch') {
      $(".watch.todo-list").append(task);
    }
    if (task.category === 'buy') {
      $(".buy.todo-list").append(task);
    }
    if (task.category === 'read') {
      $(".read.todo-list").append(task);
    }
  };

  const renderToDo = function(tasks) {
    const $container = $("#lists");
    $container.empty();
    tasks.forEach(task => {
      const newTask = createTaskElement(task);
      sendToList(newTask);
    });
  };

  //Submit a new task to list from submit form!
  $("#new-task-form").submit(function(event) {
    event.preventDefault();
    const newTask = $(this).serialize();
    const input = $("#text").val();

    $.post({
      method: 'POST',
      url: '/tasks',
      data: newTask
    }).then(loadToDo);

  });

  const loadToDo = function() {
    $.ajax({
      url: '/tasks',
      method: 'GET'
    }).then(renderToDo);
  };

  loadToDo();
});
