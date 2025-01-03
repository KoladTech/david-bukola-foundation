export default function thankYouMessage(show) {
  if (show) {
    // setShowThankYou(true); // Show thank you message
    return true;
  } else {
    // Set a timeout for thank you message and close the form in the parent page
    setTimeout(() => {
      return false;
      //   setShowThankYou(false);
      // closeForm();
    }, 3000);
  }
}
