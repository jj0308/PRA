//if logged user is admin get from this url GET https://pra-api.onrender.com/notifications admin_auth and set dinamicly notifications in index.html
role: localStorage.getItem("role");
userId: localStorage.getItem("userId");

if (role === true) {
  getNotificationsAdmin();
} else {
  getNotifications();
}

function getNotificationsAdmin() {
  fetch("https://pra-api.onrender.com/notifications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        data.forEach((notification) => {
          createNotificationCard(notification);
        });
      }
    })
    .catch((err) => console.log(err));
}

function getNotifications() {
  fetch(`https://pra-api.onrender.com/notifications/${userId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        data.forEach((notification) => {
          createNotificationCard(notification);
        });
      }
    })
    .catch((err) => console.log(err));
}
function createNotificationCard(notification) {
  let divCard = document.createElement("div");
  divCard.className = "notificationCard";

  let title = document.createElement("h3");
  title.className = "titleOfNotification";
  title.innerText = notification.title;

  let course = document.createElement("p");
  course.className = "nameOfCourse";
  course.innerText = notification.course;

  let description = document.createElement("p");
  description.className = "description";
  description.innerText = notification.description;

  let informations = document.createElement("div");
  informations.className = "informations";

  let date = document.createElement("p");
  date.className = "date";
  date.innerText = notification.date;

  let creator = document.createElement("p");
  creator.className = "creator";
  creator.innerText = notification.creator;

  informations.appendChild(date);
  informations.appendChild(creator);

  divCard.appendChild(title);
  divCard.appendChild(course);
  divCard.appendChild(description);
  divCard.appendChild(informations);

  document.querySelector(".container").appendChild(divCard);
}
