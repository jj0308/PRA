window.onload = function () {
  let role = localStorage.getItem("role") === "true";
  let userId = localStorage.getItem("userId");

  if (role) {
    getNotificationsAdmin();
  } else {
    getNotifications(userId);
  }
};

function getNotificationsAdmin() {
  console.log("tu sam");
  fetch("https://pra-api.onrender.com/notifications", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
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

function getNotifications(userId) {
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
    .catch((err) => console.log(err + "tu pukne 2"));
}

function createNotificationCard(notification) {
  let divCard = document.createElement("div");
  divCard.className = "notificationCard";

  let title = document.createElement("h3");
  title.className = "titleOfNotification";
  title.innerText = notification.name;

  let course = document.createElement("p");
  course.className = "nameOfCourse";
  course.innerText = notification.name;

  let description = document.createElement("p");
  description.className = "description";
  description.innerText = notification.description;

  let informations = document.createElement("div");
  informations.className = "informations";

  let date = document.createElement("p");
  date.className = "date";
  date.innerText = notification.date_created;

  let creator = document.createElement("p");
  creator.className = "creator";
  creator.innerText = notification.userId;

  informations.appendChild(date);
  informations.appendChild(creator);

  divCard.appendChild(title);
  divCard.appendChild(course);
  divCard.appendChild(description);
  divCard.appendChild(informations);

  document.querySelector(".container").appendChild(divCard);
}
