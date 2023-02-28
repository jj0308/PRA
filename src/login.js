// Array of user objects with usernames and passwords
const users = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
];

// Function to handle form submission
function handleLogin(event) {
  event.preventDefault();
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  // Check if username and password match a user in the array
  const matchedUser = users.find(
    (user) =>
      user.username === usernameInput.value &&
      user.password === passwordInput.value
  );

  if (matchedUser) {
    // Redirect to "potetna.html"
    window.location.href = "../html/obavijesti.html";
  } else {
    alert("Invalid username or password.");
  }
}

// Add form submit event listener
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", handleLogin);
