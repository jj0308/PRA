// Define constants for modal dialog, button, and list elements
const modal = document.getElementById("modalDialog");
const btn = document.getElementById("btnAdd");
const list = document.getElementById("kolegijList");
const form = document.getElementById("kolegijForm");
const close = document.getElementById("close");
// Define a class for a subject
class Subject {
  constructor(name, lecturer) {
    this.name = name;
    this.lecturer = lecturer;
  }
}

// Define an array to store subjects
const subjects = [];

// Define a function to open the modal dialog
const openModal = () => {
  modal.style.display = "block";
};

// Define a function to close the modal dialog
const closeModal = () => {
  modal.style.display = "none";
};

// Define a function to handle form submission
const addSubject = (event) => {
  event.preventDefault(); // prevent the form from submitting
  const name = document.getElementById("name").value;
  const lecturer = document.getElementById("lecturer").value;
  const item = document.createElement("li");
  item.textContent = `${name} (${lecturer})`;
  const subject = new Subject(name, lecturer);
  subjects.push(subject);
  console.log(subjects);
  list.appendChild(item);
  closeModal(); // close the modal dialog
};

// Add event listeners for form submission and close button click
form.addEventListener("submit", addSubject);
close.addEventListener("click", closeModal);
btn.addEventListener("click", openModal);

// Add event listener for clicking outside the modal dialog to close it
window.onclick = (event) => {
  if (event.target == modal) {
    closeModal();
  }
};
