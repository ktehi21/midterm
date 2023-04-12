function showLoggedInContent() {
  // Check if session cookie is present (replace 'sessionId' with your session cookie name)
  const isLoggedIn = document.cookie.includes('sessionId');

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
