// =====================================
// DEMO LOGIN
// =====================================

function login(event) {

    event.preventDefault();

    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    // Check role
    if (role === "") {
        message.innerText = "Please select a role.";
        message.style.color = "red";
        return;
    }

    // Check fields are not empty
    if (username === "" || password === "") {
        message.innerText = "Please enter username and password.";
        message.style.color = "red";
        return;
    }

    // Save login details
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userRole", role);

    // =================================
    // ADMIN
    // =================================

    if (role === "admin") {

        window.location.href = "admin.html";
        return;
    }

    // =================================
    // FACULTY
    // =================================

    if (role === "faculty") {

        window.location.href = "faculty.html";
        return;
    }

    // =================================
    // STUDENT
    // =================================

    if (role === "student") {

        window.location.href = "student.html";
        return;
    }
}

window.login = login;