//Create delete function for deleting notifications from the ui and the database  this is url for DELETE https://pra-api.onrender.com/notification/:notification_id auth get notifications id from URL https://pra-api.onrender.com/notification/:notification_id
role: localStorage.getItem("role");

function deleteNotification() {
  const url = `https://pra-api.onrender.com/notification/${notification_id}`;
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getNotifications();
    });
}
//deleteNotification will be called on click button with id="btnDelete prevent default
const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  if (role === true) {
    deleteNotification();
  } else {
    alert("You are not authorized to delete notifications");
  }
});
