// Client facing scripts:

$(document).ready(function () {

  //collapsible container for each category's list
  const coll = document.getElementsByClassName("collapsible");
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }

  function showElement() {
    // Get references to the elements with the given class names
    const wrapper = document.querySelector('.wrapper');
    const initialPageLoad = document.querySelector('.initial-page-load');

    // Show the wrapper element and hide the initial-page-load element
    wrapper.style.display = 'block';
    initialPageLoad.style.display = 'none';

    // Update the button text
    const button = document.querySelector('button');
    button.innerHTML = 'Hello, Andrea!';
  }

  showElement();
});

