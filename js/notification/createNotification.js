async function handleCreateNotification(event) {
  event.preventDefault();

  const titleofNotification = document.getElementById(
    "titleofNotification"
  ).value;
  const course = document.getElementById("course").value;
  const description = document.getElementById("description").value;

  const courses = await getCourses();
  const courseObj = courses.find((l) => l.name === course);

  if (!courseObj) {
    alert("Course not found. Please ensure the Course exists.");
    return;
  }

  const data = {
    name: titleofNotification,
    description: description,
    //ovo sam harkodirao
    data_expired: Date.now() + 60 * 60 * 1000,
    user_id: localStorage.getItem("userId"),
    course_id: courseObj._id,
  };

  fetch(`https://pra-api.onrender.com/notification`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  })
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        window.location.href = "/html/notification/notification.html";
      } else {
        alert("Course creation failed. Please try again.");
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

document
  .getElementById("createNotification")
  .addEventListener("submit", handleCreateNotification);
