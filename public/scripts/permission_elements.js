// function showElement() {
//   // Get references to the elements with the given class names
//   const wrapper = document.querySelector('.wrapper');
//   const initialPageLoad = document.querySelector('.initial-page-load');

//   // Show the wrapper element and hide the initial-page-load element
//   wrapper.style.display = 'block';
//   initialPageLoad.style.display = 'none';

//   // Update the button text
//   const button = document.querySelector('button');
//   button.innerHTML = 'Hello, Andrea!';
// };

function showElement() {
  const wrapper = $('.wrapper');
  const initialPageLoad = $('.initial-page-load');

  wrapper.css('display', 'block');
  initialPageLoad.css('display', 'none');

  const button = $('.login');
  button.html('Hello, Andrea!');
};
