document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("#navbar");
  const footer = document.querySelector("#footer");

  fetch("/html/components/navbarAdmin.html")
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
