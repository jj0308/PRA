function handleEditLecturer(event) {
  event.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;

  //ne znam kako dohvatiti user id
  const userId = "<USER_ID>";

  const data = {
    first_name: firstName,
    last_name: lastName,
    email: email,
  };

  const token = localStorage.getItem("token");

  fetch(`https://pra-api.onrender.com/lecturer/${userId}`, {
    method: "PUT",
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
        alert("Lecturer update failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

document
  .getElementById("editLecturer")
  .addEventListener("submit", handleEditLecturer);
