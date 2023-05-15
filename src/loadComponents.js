document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("#navbar");
  const footer = document.querySelector("#footer");
  const role = localStorage.getItem("role") === "true";

  const navbarPath = role ? "/html/components/navbarAdmin.html" : "/html/components/navbarLecturer.html";

  fetch(navbarPath)
    .then((response) => response.text())
    .then((data) => {
      navbar.innerHTML = data;
    });

  fetch("/html/components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footer.innerHTML = data;
    });
});