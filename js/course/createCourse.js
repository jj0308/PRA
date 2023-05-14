async function handleCreateCourse(event) {
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

  fetch(`https://pra-api.onrender.com/course`, {
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
        window.location.href = "/html/course/course.html";
      } else {
        alert("Lecturer creation failed. Please try again.");
      }
    })
    .catch(function (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

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
document
  .getElementById("createCourse")
  .addEventListener("submit", handleCreateCourse);
