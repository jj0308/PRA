let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
window.notificationId = params.get("id");

window.onload = function () {
  console.log(notificationId);
  fetch(`https://pra-api.onrender.com/notification/${window.notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then(async (data) => {
      document.getElementById("titleofNotification").value = data.name;
      document.getElementById("description").value = data.description;
      const courseName = await getCourseName(data.course_id);
      document.getElementById("course").value = courseName;
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });

  document
    .getElementById("btnEdit")
    .addEventListener("submit", (event) =>
      handleEditNotification(event, window.notificationId)
    );
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

async function handleEditNotification(event, notificationId) {
  event.preventDefault();

  const title = document.getElementById("titleofNotification").value;
  const description = document.getElementById("description").value;
  const course = document.getElementById("course").value;

  const courses = await getCourses();
  const courseObj = courses.find((c) => c.name === course);

  if (!courseObj) {
    alert("Course not found. Please ensure the course exists.");
    return;
  }

  const data = {
    name: title,
    description: description,
    course_id: courseObj._id,
    date_expired: Date.now(),
  };

  fetch(`https://pra-api.onrender.com/notification/${notificationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        window.location.href = "/html/course/course.html";
      } else {
        alert("Lecturer update failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

async function getCourses() {
  try {
    const response = await fetch("https://pra-api.onrender.com/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    let courses = data.map((item) => ({
      _id: item._id,
      name: item.name,
    }));

    return courses;
  } catch (error) {
    console.error("Error:", error);
  }
}
