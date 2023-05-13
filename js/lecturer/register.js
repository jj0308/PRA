function handleRegister(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  };

  fetch("https://pra-api.onrender.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = "/html/lecturer/lecturer.html";
      } else if (response.status === 409) {
        alert("Registration failed. This user may already exist.");
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
