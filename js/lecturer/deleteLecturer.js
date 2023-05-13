function deleteUser(event) {
  event.preventDefault();

  // Get the user's id from the button that was clicked
  let userId = event.currentTarget.dataset.userId; // Corrected this line

  fetch(`https://pra-api.onrender.com/lecturer/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("User deleted successfully.");
        location.reload();
      } else {
        alert("Failed to delete user. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}

// Add event listener to all delete buttons
document.addEventListener("DOMContentLoaded", (event) => {
  let deleteButtons = document.querySelectorAll(".btnDelete");
  console.log(deleteButtons);
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteUser);
  });
});
