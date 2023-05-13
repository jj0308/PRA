function handleRegister(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  const token = localStorage.getItem("token");

  fetch("https://pra-backend.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = "/html/lecturer/lecturer.html";
      } else {
        alert("Registration failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

document
  .getElementById("createLecturer")
  .addEventListener("submit", handleRegister);
