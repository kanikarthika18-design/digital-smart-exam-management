function viewExams() {
    window.location.href = "exam.html";
}

function viewQuestions() {
    window.location.href = "questions.html";
}

function viewResults() {
    window.location.href = "results.html";
}

function viewPerformance() {
    window.location.href = "performance.html";
}

function logout() {
    window.location.href = "index.html";
}
window.addEventListener("DOMContentLoaded", function () {

    const username = localStorage.getItem("loggedInUser");

    const welcome = document.getElementById("welcomeFaculty");

    if (username && welcome) {
        welcome.innerText = "Welcome, " + username;
    }
    function logout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userRole");
        window.location.href = "index.html";
    }

});