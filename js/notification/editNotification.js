let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let notificationId = params.get("id");

window.onload = function () {
  fetch(`https://pra-api.onrender.com/notification/${notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      document.getElementById("titleofNotification").value = data.name;
      document.getElementById("description").value = data.description;
      const courseName = await getCourseName(data.course_id);
      document.getElementById("course").value = courseName;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
};

///need to add the hande on button click

function getCourseName(courseId) {
  return fetch(`https://pra-api.onrender.com/course/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.name;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}
