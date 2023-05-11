function handleCreateCourse(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lecturer = document.getElementById("lecturer").value;

  const data = {
    name: name,
    lecturer: lecturer,
  };

  const token = localStorage.getItem("token");

  fetch("https://pra-backend.onrender.com/create_course", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = "/html/course/course.html";
      } else {
        alert("Course creation failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

document
  .getElementById("createCourse")
  .addEventListener("submit", handleCreateCourse);
