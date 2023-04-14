//sets up functions devoted to task creation and task assignment functionality
$(document).ready(function() {

  //escape func: unsafe tweets/entries containing malicious text are converted to safe text
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //form to create a new task item
  const createTaskElement = function(task) {
    const $task = $(`
    <article class="task ${task.category_id}" id="${task.id}>
      <p><label>
          <input type="checkbox">
          <span class="checkable"> ${escape(task.title)}
        </label>
      </p>
      </article>
  `);
    return $task;
  };

  const sendToList = function(task, taskData) {
    if (taskData.category_id === 1) {
      $(".eat .todo-list").append(task);
      return;
    }
    if (taskData.category_id === 2) {
      $(".watch .todo-list").append(task);
      return;
    }
    if (taskData.category_id === 3) {
      $(".buy .todo-list").append(task);
      return;
    }
    if (taskData.category_id === 4) {
      $(".read .todo-list").append(task);
      return;
    }
  };

  const renderToDo = function(tasks) {
    const $container = $("#todo-list");
    $container.empty();

    tasks.forEach(task => {
      const newTask = createTaskElement(task);
      sendToList(newTask, task);
    });
  };

  const loadToDo = function() {
    $.ajax({
      url: '/todo',
      method: 'GET'
    }).then((response) => {
      console.log("response data, index file", response);
      renderToDo(response || []);
    });
  };

  //Submit a new task to list from submit form!
  $("#add-todo").on("click", function(event) {
    console.log("Random");
    event.preventDefault();
    const newTask = $(this).serialize();
    const input = $("#task").val();

    $.post({
      method: 'POST',
      url: '/todo',
      data: { task: input }
    }).then((val) => {
      console.log("Random val success", val); // this is the object response from category decision
      loadToDo();
    });
  });

  loadToDo();
});
