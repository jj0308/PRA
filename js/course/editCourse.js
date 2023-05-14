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
    .then(async (data) => {
      document.getElementById("name").value = data.name;
      const lecturerId = data.user ? data.user._id : null;
      await populateLecturersDropdown(lecturerId);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });

  // Attach event listener to the form
  document.getElementById("editCourse").addEventListener("submit", handleEditCourse);
};

async function populateLecturersDropdown(defaultValue) {
  const lecturers = await getLecturers();
  const lecturerSelect = document.getElementById("lecturer");

  // Create dropdown options
  lecturers.forEach((lecturer) => {
    const option = document.createElement("option");
    option.value = lecturer._id;
    option.textContent = lecturer.full_name;
    lecturerSelect.appendChild(option);
  });

  // Set default option based on defaultValue
  if (defaultValue) {
    lecturerSelect.value = defaultValue;
  }
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

async function handleEditCourse(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const lecturer = document.getElementById("lecturer").value;

  const data = {
    name: name,
    user_id: lecturer,
  };

  try {
    const response = await fetch(`https://pra-api.onrender.com/course/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Course update successful.");
      // You can perform any additional actions or updates here
    } else {
      alert("Course update failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again later.");
  }
}