async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Create the request payload
  const data = {
    username,
    password,
  };

  try {
    const response = await fetch("https://pra-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      window.location.href = "/html/index.html";
    } else {
      throw new Error("Login failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

document.getElementById("login").addEventListener("submit", handleLogin);
