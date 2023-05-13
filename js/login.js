async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Create the request payload
  const data = {
    email,
    password,
  };

  try {
    const response = await fetch(`https://pra-api.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      const role = data.administrator;
      const userId = data._id;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

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
