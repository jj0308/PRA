let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let notificationId = params.get("id");
console.log(notificationId);
window.onload = function () {
  fetch(`https://pra-api.onrender.com/notification/${notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("titleofNotification").value = data.name;
      document.getElementById("course").value = data.course.name;
      document.getElementById("description").value = data.description;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
};
