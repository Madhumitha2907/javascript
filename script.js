function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
    const signupMessage = document.getElementById("signup-message");
  
    if (username && password) {
      // Save the username and password in local storage (for testing purposes only)
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      signupMessage.textContent = "Signup successful! You can now log in.";
      signupMessage.style.color = "green";
    } else {
      signupMessage.textContent = "Please fill in both fields.";
      signupMessage.style.color = "red";
    }
  }
  
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");
  
    // Retrieve stored username and password
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
  
    if (username === storedUsername && password === storedPassword) {
      alert("Login successful!");
      errorMessage.textContent = "";
    } else {
      errorMessage.textContent = "Invalid username or password";
    }
  }
  
  // Toggle between login and signup forms
  function toggleForms() {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("form-title");
    const toggleText = document.getElementById("toggle-form");
  
    if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      formTitle.textContent = "Login";
      toggleText.textContent = "Don't have an account? Sign up";
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      formTitle.textContent = "Sign Up";
      toggleText.textContent = "Already have an account? Log in";
    }
  }
  