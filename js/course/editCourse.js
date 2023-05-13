function handleEditCourse(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lecturer = document.getElementById("lecturer").value;

  //nisam zna kako dohvaiti course id isto
  const courseId = "<COURSE_ID>";

  const data = {
    name: name,
    user_id: lecturer,
  };

  const token = localStorage.getItem("token");

  fetch(`https://pra-api.onrender.com/course/${courseId}`, {
    method: "PUT",
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
        alert("Course update failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

document
  .getElementById("editCourse")
  .addEventListener("submit", handleEditCourse);
