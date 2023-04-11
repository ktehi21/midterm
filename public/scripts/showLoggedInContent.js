function showLoggedInContent() {
  // Check if user is logged in (replace with your own login check)
  const isLoggedIn = true;

  if (isLoggedIn) {
    // Show elements with class .wrapper
    const wrapperElements = document.querySelectorAll('.wrapper');
    wrapperElements.forEach(element => {
      element.style.display = 'block';
    });

    // Hide elements with class .initial-page-load
    const initialLoadElements = document.querySelectorAll('.initial-page-load');
    initialLoadElements.forEach(element => {
      element.style.display = 'none';
    });
  }
}
