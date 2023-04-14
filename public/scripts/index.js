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
      <div class="task ${task.category_id}" id="${task.id}>
        <div class="input">
          <p for="task">${escape(task.title)}</p>
          <div class="task-buttons">
      	    <button class='remove' value=${task.delete} type='submit'><i class="fa-regular fa-minus"></i></button>
        	  <button class='edit-task' type='submit'><i class="fas fa-pencil-alt"></i></button>
      	  </div>
        </div>
      </div
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

  //remove a task from list
  const removeTask = function() {
    $(document).on("click", ".remove", function() {
      const taskLocation = $(this).closest(".task").attr("id");
      $.ajax({
        type: 'DELETE',
        url: `/todo/${taskLocation}`,
      })
        .done(() => {
          console.log("Task removed")
          $(this).closest(".task").remove();
        })
    });
  };

  const emptyTaskLists = function() {
    $(".eat.todo-list").empty();
    $(".watch.todo-list").empty();
    $(".buy.todo-list").empty();
    $(".read.todo-list").empty();
  };

  const renderToDo = function(tasks) {
    emptyTaskLists();

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
      renderToDo(response || []);
    });
  };

  //Submit a new task to list from submit form!
  $("#add-todo").on("click", function(event) {
    event.preventDefault();
    //newTask to be used for error handling
    const newTask = $(this).serialize();
    const input = $("#task").val();

    $.post({
      method: 'POST',
      url: '/todo',
      data: { task: input }
    }).then((val) => {
      loadToDo();
    });
  });
  loadToDo();
  removeTask();
});

