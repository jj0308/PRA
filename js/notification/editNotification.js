function handleEditNotification(event) {
  event.preventDefault();

  // Get the form inputs
  const title = document.getElementById("titleofNotification").value;
  const course = document.getElementById("course").value;
  const description = document.getElementById("description").value;

  //nisam zna kako da dodam notification id
  //get this notificationId form the url of the notification

  const notificationId = "<NOTIFICATION_ID>";

  const data = {
    name: title,
    course_id: course,
    description: description,
  };

  const token = localStorage.getItem("token");

  fetch(`https://pra-api.onrender.com/notification/${notificationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = "/html/notification/notification.html";
      } else {
        alert("Notification update failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

document
  .getElementById("createNotification")
  .addEventListener("submit", handleEditNotification);
