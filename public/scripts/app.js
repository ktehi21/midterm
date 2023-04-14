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

});

function showLoggedInContent() {
  // Check if session cookie is present (replace 'sessionId' with your session cookie name)
  const isLoggedIn = document.cookie.includes('sessionId');

  if (isLoggedIn) {
    // Show elements with class .wrapper
    const wrapperElements = document.querySelectorAll('.wrapper');
    wrapperElements.forEach(element => {
      element.style.display = 'none';
    });

    // Hide elements with class .initial-page-load
    const initialLoadElements = document.querySelectorAll('.initial-page-load');
    initialLoadElements.forEach(element => {
      element.style.display = 'block';
    });
  }
}
