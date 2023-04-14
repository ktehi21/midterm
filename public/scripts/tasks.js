//sets up functions devoted to task creation and task assignment functionality

$(document).ready(function () {

  //escape func: unsafe tweets/entries containing malicious text are converted to safe text
  const escape = (str) => {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  //form to create a new task item
  ////////// key names (title, category, post_time)
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

  /////// now we need 2 arguments task, taskObj
  const sendToList = function(task, taskObj) {
    console.log("taskObj", taskObj);
    console.log("task", task);
    if (taskObj.category === 'EAT') {
      $(".eat .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'WATCH') {
      $(".watch .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'BUY') {
      $(".buy .todo-list").append(task);
      return;
    }
    if (taskObj.category === 'READ') {
      $(".read .todo-list").append(task);
      return;
    }
  };

  //////// sendToList has 2 arguments
  //////// please choose right element for the $container
  const renderToDo = function(tasks) {
    const $container = $(".todo-list");
    $container.empty();
    tasks.forEach(task => {
      const newTask = createTaskElement(task);
      sendToList(newTask, task);
    });
  };

  //Submit a new task to list from submit form!
  ///////// now submit button doesn't have type, please use id and 'click'
  $("#submit").on("click", function(event) {
    event.preventDefault();
    const newTask = $(this).serialize();
    const input = $("#task").val();
    console.log("CLICKED!");
    /////// url, data changed
    /////// change the then contain function (val), and renderToDo(val.data)
    $.post({
      method: 'POST',
      url: '/todo',
      data: {task:input}
    }).then((val)=>{
      // this is the object response from category decision
      console.log(val);
      loadToDo();
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
