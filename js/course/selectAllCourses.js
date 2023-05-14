let userId = localStorage.getItem("userId");
console.log();

if ("true" === localStorage.getItem("role")) {
  getCoursesAdmin();
} else {
  getCourses();
}

function createCourseRow(course) {
  const courseTr = document.createElement("tr");
  const courseNameTd = document.createElement("td");
  const courseLecturerTd = document.createElement("td");

  courseNameTd.textContent = course.title;
  courseLecturerTd.textContent = course.lecturer;

  courseTr.appendChild(courseNameTd);
  courseTr.appendChild(courseLecturerTd);

  return courseTr;
}

function appendCoursesToTable(courses) {
  const table = document.querySelector(".container table");
  courses.forEach((course) => {
    const courseRow = createCourseRow(course);
    table.appendChild(courseRow);
  });
}

function getCourses() {
  const url = `https://pra-api.onrender.com/courses/${userId}`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      appendCoursesToTable(data);
    });
}

function createCourseRowAdmin(course) {
  const courseTr = document.createElement("tr");
  const courseNameTd = document.createElement("td");
  const courseLecturerTd = document.createElement("td");
  const courseOptionsTd = document.createElement("td");
  const optionsWrapperDiv = document.createElement("div");

  courseNameTd.textContent = course.name;
  if (course.user && course.user.full_name != undefined) {
    courseLecturerTd.textContent = course.user.full_name;
  } else {
    courseLecturerTd.textContent = "Currently unassigned";
  }

  optionsWrapperDiv.innerHTML = `
    <a id="btnEdit" href="/html/course/editCourse.html?id=${course._id}">
      <img src="/media/edit.png" alt=""/>
    </a>
    <a id="btnDelete" href="#!" data-course-id="${course._id}">
      <img src="/media/delete.png" alt="Delete" />
    </a>

  `;

  courseOptionsTd.appendChild(optionsWrapperDiv);

  courseTr.appendChild(courseNameTd);
  courseTr.appendChild(courseLecturerTd);
  courseTr.appendChild(courseOptionsTd);
  let deleteButtons = document.querySelectorAll("#btnDelete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteCourse);
  });

  return courseTr;
}

function appendCoursesToTableAdmin(courses) {
  const table = document.querySelector(".container table");
  courses.forEach((course) => {
    const courseRow = createCourseRowAdmin(course);
    table.appendChild(courseRow);
  });
}

function getCoursesAdmin() {
  const url = `https://pra-api.onrender.com/courses`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      appendCoursesToTableAdmin(data);
    });
}
