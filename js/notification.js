
function handleCreateNotification(event) {
  event.preventDefault(); 


  const title = document.getElementById("titleofNotification").value;
  const course = document.getElementById("course").value;
  const description = document.getElementById("description").value;

  
  const data = {
    name: title,
    course_id: course,
    description: description
  };

  
  const token = localStorage.getItem("token");

 
  fetch("https://pra-api.onrender.com/notification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
  
        window.location.href = "/html/notification/notification.html";
      } else {
       
        alert("Notification creation failed. Please try again.");
      }
    })
    .catch(function(error) {
      
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    });
}


document
  .getElementById("createNotification")
  .addEventListener("submit", handleCreateNotification);
