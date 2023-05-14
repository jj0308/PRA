let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
window.notificationId = params.get("id");

window.onload = async function () {
  console.log(notificationId);
  const response = await fetch(`https://pra-api.onrender.com/notification/${window.notificationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  });

  const data = await response.json();
  document.getElementById("titleofNotification").value = data.name;
  document.getElementById("description").value = data.description;

  const courses = await getCourses();
  const courseSelect = document.getElementById("course");

  // Create dropdown options
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course._id;
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });

  
  // Set default option based on existing notificationId
  courseSelect.value = data.course_id;
  document.getElementById("createNotification").addEventListener("submit", (event) =>
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
  const courseId = document.getElementById("course").value;

  const courses = await getCourses();
  const courseObj = courses.find((c) => c._id === courseId);

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


  try {
    const response = await fetch(`https://pra-api.onrender.com/notification/${notificationId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Notification update successful.");
    } else {
      alert("Lecturer update failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
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

    const courseSelect = document.getElementById("course");

    // Create dropdown options
    courses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course._id;
      option.textContent = course.name;
      courseSelect.appendChild(option);
    });

    // Set default option based on existing notificationId
    const defaultOption = courses.find((course) => course._id === window.notificationId);
    if (defaultOption) {
      courseSelect.value = defaultOption._id;
    }

    return courses;
  } catch (error) {
    console.error("Error:", error);
  }
}
