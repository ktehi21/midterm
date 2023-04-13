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
      <article class="task ${task.category}" id="${task.title}>
        <p><label>
            <input type="checkbox">
            <span class="checkable"> ${escape(task.title)}
          </label>
        </p>
        </article>
    `);
    return $task;
  };

  const sendToList = function(task, taskObj) {
    console.log("taskObj", taskObj);
    console.log("task", task);
    if (taskObj.category === 'eat') {
      $(".eat .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'watch') {
      $(".watch .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'buy') {
      $(".buy .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'read') {
      $(".read .todo-list").append(task);
      return;
    }
  };

  const renderToDo = function(tasks) {
    const $container = $(".todo-list");
    $container.empty();
    tasks.forEach(task => {
      const newTask = createTaskElement(task);
      sendToList(newTask, task);
    });
  };

  //Submit a new task to list from submit form!
  $("#submit").on("click", function(event) {
    event.preventDefault();
    const newTask = $(this).serialize();
    const input = $("#task").val();

    $.post({
      method: 'POST',
      url: '/todo',
      data: {task:input}
    }).then((val)=>{
      console.log(val); // this is the object response from category decision
      // loadToDo();
      renderToDo(val.data);
    });

  });

  const loadToDo = function() {
    $.ajax({
      url: '/tasks',
      method: 'GET'
    }).then(renderToDo);
  };

  loadToDo();
});
