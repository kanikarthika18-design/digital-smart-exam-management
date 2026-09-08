// =====================================
// STUDENT DASHBOARD
// =====================================

// START EXAM
function startExam() {
    window.location.href = "exam.html";


}


// VIEW MY RESULTS
function viewMyResults() {
    window.location.href = "results.html";
}


// LOGOUT
function logout() {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
}


// =====================================
// LOAD STUDENT DASHBOARD
// =====================================

window.addEventListener("DOMContentLoaded", function () {

    // Student username
    const username =
        localStorage.getItem("loggedInUser");

    const welcomeStudent =
        document.getElementById("welcomeStudent");

    if (username && welcomeStudent) {

        welcomeStudent.innerText =
            "Welcome, " + username + " 👋";
    }


    // Get performance data
    const data =
        JSON.parse(
            localStorage.getItem("performanceData")
        ) || [];


    // If no exams completed
    if (data.length === 0) {

        document.getElementById("totalExams").innerText = "0";
        document.getElementById("averageScore").innerText = "0%";
        document.getElementById("highestScore").innerText = "0%";
        document.getElementById("passFail").innerText = "-";

        return;
    }


    // =================================
    // TOTAL EXAMS
    // =================================

    const totalExams = data.length;


    // =================================
    // AVERAGE SCORE
    // =================================

    const totalPercentage =
        data.reduce(function (sum, result) {

            return sum +
                Number(result.percentage || 0);

        }, 0);


    const averageScore =
        totalPercentage / totalExams;


    // =================================
    // HIGHEST SCORE
    // =================================

    const highestScore =
        Math.max(
            ...data.map(function (result) {

                return Number(
                    result.percentage || 0
                );

            })
        );


    // =================================
    // PASS / FAIL
    // =================================

    const passCount =
        data.filter(function (result) {

            return result.status === "PASS";

        }).length;


    const failCount =
        totalExams - passCount;


    // =================================
    // DISPLAY DASHBOARD
    // =================================

    document.getElementById("totalExams").innerText =
        totalExams;


    document.getElementById("averageScore").innerText =
        averageScore.toFixed(2) + "%";


    document.getElementById("highestScore").innerText =
        highestScore.toFixed(2) + "%";


    document.getElementById("passFail").innerText =
        passCount +
        " Pass / " +
        failCount +
        " Fail";


    // =================================
    // SUBJECT PERFORMANCE
    // =================================

    const subjects = {};


    data.forEach(function (result) {

        const subject =
            result.subject || "Computer";


        if (!subjects[subject]) {

            subjects[subject] = [];

        }


        subjects[subject].push(
            Number(result.percentage || 0)
        );

    });


    let subjectText = "";


    for (const subject in subjects) {

        const scores =
            subjects[subject];


        const subjectTotal =
            scores.reduce(
                function (sum, score) {

                    return sum + score;

                },
                0
            );


        const subjectAverage =
            subjectTotal / scores.length;


        subjectText +=
            subject +
            ": " +
            subjectAverage.toFixed(2) +
            "%<br>";

    }


    const subjectElement =
        document.getElementById(
            "subjectPerformance"
        );


    if (subjectElement) {

        subjectElement.innerHTML =
            subjectText;

    }


    // =================================
    // IMPROVEMENT TREND
    // =================================

    const trendElement =
        document.getElementById(
            "improvementTrend"
        );


    if (!trendElement) {
        return;
    }


    if (data.length >= 2) {

        const previous =
            Number(
                data[data.length - 2].percentage || 0
            );


        const current =
            Number(
                data[data.length - 1].percentage || 0
            );


        if (current > previous) {

            trendElement.innerText =
                "📈 Your performance is improving.";

        }
        
        else if (current < previous) {

            trendElement.innerText =
                "📉 Your performance needs improvement.";

        }

        else {

            trendElement.innerText =
                "➡️ Your performance is stable.";

        }

    }

    else {

        trendElement.innerText =
            "Complete another exam to see your improvement trend.";

    }

});