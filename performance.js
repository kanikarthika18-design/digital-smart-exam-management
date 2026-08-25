// =====================================
// PERFORMANCE PAGE
// =====================================

window.addEventListener("DOMContentLoaded", function () {

    loadPerformance();

});


// =====================================
// LOAD PERFORMANCE
// =====================================

function loadPerformance() {

    const performanceData =
        JSON.parse(
            localStorage.getItem("performanceData")
        ) || [];


    // No performance data

    if (performanceData.length === 0) {

        document.getElementById("totalQuestions").innerText = "0";

        document.getElementById("correctAnswers").innerText = "0";

        document.getElementById("wrongAnswers").innerText = "0";

        document.getElementById("percentage").innerText = "0%";

        document.getElementById("status").innerText = "-";

        document.getElementById("performance").innerText = "-";

        return;
    }


    // Get latest exam result

    const result =
        performanceData[
        performanceData.length - 1
        ];


    const total =
        Number(result.totalQuestions || 0);


    const correct =
        Number(result.score || 0);


    const percentage =
        Number(result.percentage || 0);


    const wrong =
        total - correct;


    const status =
        result.status || "-";


    // Performance text

    let performanceText = "";


    if (percentage >= 80) {

        performanceText = "Excellent";

    }

    else if (percentage >= 60) {

        performanceText = "Good";

    }

    else if (percentage >= 40) {

        performanceText = "Average";

    }

    else {

        performanceText = "Needs Improvement";

    }


    // Display data

    document.getElementById("totalQuestions").innerText =
        total;


    document.getElementById("correctAnswers").innerText =
        correct;


    document.getElementById("wrongAnswers").innerText =
        wrong;


    document.getElementById("percentage").innerText =
        percentage.toFixed(2) + "%";


    document.getElementById("status").innerText =
        status;


    document.getElementById("performance").innerText =
        performanceText;

}


// =====================================
// DASHBOARD
// =====================================

function goToAdmin() {

    window.location.href = "admin.html";

}


// =====================================
// CREATE EXAM
// =====================================

function createExam() {

    window.location.href = "exam.html";

}


// =====================================
// ADD QUESTIONS
// =====================================

function addQuestions() {

    window.location.href = "questions.html";

}


// =====================================
// STUDENT RESULTS
// =====================================

function viewResults() {

    window.location.href = "results.html";

}


// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem("loggedInUser");

    localStorage.removeItem("userRole");

    window.location.href = "index.html";

}