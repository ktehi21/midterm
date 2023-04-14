function showElement() {
  // Get references to the elements with the given class names
  const wrapper = $('.wrapper');
  const initialPageLoad = $('.initial-page-load');

  // Show the wrapper element and hide the initial-page-load element
  wrapper.css('display', 'block');
  initialPageLoad.css('display', 'none');

  // Update the button text
  const button = $('.login');
  button.html('Hello, Andrea!');
};
