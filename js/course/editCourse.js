let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let courseId = params.get("id");
window.onload = function () {
  fetch(`https://pra-api.onrender.com/course/${courseId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("name").value = data.name;
      document.getElementById("lecturer").value;

      if (data.user && data.user.full_name != undefined) {
        document.getElementById("lecturer").value = data.user.full_name;
      } else {
        document.getElementById("lecturer").value = "Currently unassigned";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });

  // Attach event listener to the form
  document
    .getElementById("editCourse")
    .addEventListener("submit", handleEditCourse);
};

async function getLecturers() {
  try {
    const response = await fetch("https://pra-api.onrender.com/lecturers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    let lecturers = data.map((item) => ({
      _id: item._id,
      full_name: item.first_name + " " + item.last_name,
    }));

    return lecturers;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function handleEditCourse(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lecturer = document.getElementById("lecturer").value;

  const lecturers = await getLecturers();
  const lecturerObj = lecturers.find((l) => l.full_name === lecturer);

  if (!lecturerObj) {
    alert("Lecturer not found. Please ensure the lecturer exists.");
    return;
  }

  const data = {
    name: name,
    user_id: lecturerObj._id,
  };

  fetch(`https://pra-api.onrender.com/course/${courseId}`, {
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
