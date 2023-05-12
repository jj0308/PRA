const { get } = require("http");
role: localStorage.getItem("role");
userId: localStorage.getItem("userId");

if (role === true) {
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
  fetch(url)
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

  courseNameTd.textContent = course.title;
  courseLecturerTd.textContent = course.lecturer; // Assuming that the lecturer's name is returned by the API as well.

  optionsWrapperDiv.innerHTML = `
    <a id="btnEdit" href="/html/course/editCourse.html?id=${course.id}">
      <img src="/media/edit.png" alt=""/>
    </a>
    <button id="btnDelete">
      <img src="/media/delete.png" alt="" />
    </button>
  `;

  courseOptionsTd.appendChild(optionsWrapperDiv);

  courseTr.appendChild(courseNameTd);
  courseTr.appendChild(courseLecturerTd);
  courseTr.appendChild(courseOptionsTd);

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
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      appendCoursesToTableAdmin(data);
    });
}
