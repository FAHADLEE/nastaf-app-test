function validate() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (username === "qaifi" && password === "qaifi") {
      alert("Login Succesfull");
      window.location.href = "orders.html";
    } else {
      alert("Invalid username or password");
    }
  }