window.onload = function () {
  const table = document.getElementById("lecturerTable");

  fetch("https://pra-api.onrender.com/lecturers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => populateTable(data, table))
    .catch((error) => {
      console.error("Error:", error);
    });
};

function populateTable(data, table) {
  data.forEach((lecture) => {
    const row = document.createElement("tr");
    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = lecture.first_name;
    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = lecture.last_name;
    const emailCell = document.createElement("td");
    emailCell.textContent = lecture.email;

    const optionsCell = document.createElement("td");
    optionsCell.innerHTML = `
      <div optionsWrapper>
        <a id="btnEdit" href="/html/lecturer/editLecturer.html?id=${lecture._id}">
          <img src="/media/edit.png" alt=""/>
        </a>
        <button class="btnDelete" data-user-id="${lecture._id}">
          <img src="/media/delete.png" alt="Delete" />
        </button>

      </div>
    `;

    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(optionsCell);

    table.appendChild(row);
  });
}
