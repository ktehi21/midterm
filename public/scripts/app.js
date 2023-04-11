
// Client facing scripts here
$(document).ready(function() {

  $.ajax({
    method: 'GET',
    url: '/todo'
  })
  .done((response) => {
    console.log("response", response);
  });

  const coll = document.getElementsByClassName("collapsible");

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.maxHeight){
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }

});

