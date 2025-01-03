// Email validation with a regex
export default function handleEmailValidation(e) {
  // Ensure e.target is defined
  if (!e.target) {
    console.error("e.target is undefined");
    return;
  }
  //   Get the name and value of the target element that called this function
  const { name, value } = e.target;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
  if (name === "email") {
    if (!emailPattern.test(value)) {
      return true; //Sets the setEmailErrorMessage to true
    }
  }
  return false; //Sets the setEmailErrorMessage to false
}
