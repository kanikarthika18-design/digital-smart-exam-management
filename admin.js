// =====================================
// ADMIN DASHBOARD NAVIGATION
// =====================================

function goToAdmin() {
    window.location.href = "admin.html";
}


// =====================================
// CREATE EXAM
// =====================================

function createExam() {
    window.location.href = "create-exam.html";
}


// =====================================
// ADD QUESTIONS PAGE
// =====================================

function addQuestions() {
    window.location.href = "question.html";
}


// =====================================
// VIEW RESULTS
// =====================================

function viewResults() {
    window.location.href = "results.html";
}


// =====================================
// VIEW PERFORMANCE
// =====================================

function viewPerformance() {
    window.location.href = "performance.html";
}


// =====================================
// LOGOUT
// =====================================

function logout() {

    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");

    window.location.href = "index.html";
}


// =====================================
// SMART QUESTION BANK
// ADD QUESTION
// =====================================

function addQuestion() {

    const subject =
        document.getElementById("subject").value.trim();

    const topic =
        document.getElementById("topic").value.trim();

    const difficulty =
        document.getElementById("difficulty").value;

    const question =
        document.getElementById("question").value.trim();

    const optionA =
        document.getElementById("optionA").value.trim();

    const optionB =
        document.getElementById("optionB").value.trim();

    const optionC =
        document.getElementById("optionC").value.trim();

    const optionD =
        document.getElementById("optionD").value.trim();

    const correctAnswer =
        document.getElementById("correctAnswer").value;

    const message =
        document.getElementById("message");


    // =====================================
    // VALIDATION
    // =====================================

    if (
        subject === "" ||
        topic === "" ||
        difficulty === "" ||
        question === "" ||
        optionA === "" ||
        optionB === "" ||
        optionC === "" ||
        optionD === "" ||
        correctAnswer === ""
    ) {

        if (message) {

            message.innerText =
                "Please fill all question details.";

            message.style.color = "red";
        }

        return;
    }


    // =====================================
    // GET EXISTING QUESTIONS
    // =====================================

    let questions =
        JSON.parse(
            localStorage.getItem("questions")
        ) || [];


    // =====================================
    // CREATE NEW QUESTION
    // =====================================

    const newQuestion = {

        id: Date.now(),

        subject: subject,

        topic: topic,

        difficulty: difficulty,

        question: question,

        optionA: optionA,

        optionB: optionB,

        optionC: optionC,

        optionD: optionD,

        correctAnswer: correctAnswer

    };


    // =====================================
    // SAVE TO QUESTION BANK
    // =====================================

    questions.push(newQuestion);

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );


    // =====================================
    // GET CURRENT EXAM
    // =====================================

    const currentExamId =
        Number(
            localStorage.getItem("currentExamId")
        );


    let exams =
        JSON.parse(
            localStorage.getItem("exams")
        ) || [];


    // =====================================
    // FIND CURRENT EXAM
    // =====================================

    const examIndex =
        exams.findIndex(function (exam) {

            return Number(exam.id) === currentExamId;

        });


    // =====================================
    // ADD QUESTION TO CURRENT EXAM
    // =====================================

    if (examIndex !== -1) {

        if (
            !Array.isArray(
                exams[examIndex].questions
            )
        ) {

            exams[examIndex].questions = [];

        }

        exams[examIndex].questions.push(
            newQuestion
        );

        localStorage.setItem(
            "exams",
            JSON.stringify(exams)
        );
    }


    // =====================================
    // SUCCESS MESSAGE
    // =====================================

    if (message) {

        message.innerText =
            "Question added successfully!";

        message.style.color = "green";
    }


    // =====================================
    // CLEAR FORM
    // =====================================

    document.getElementById("subject").value = "";

    document.getElementById("topic").value = "";

    document.getElementById("difficulty").value = "";

    document.getElementById("question").value = "";

    document.getElementById("optionA").value = "";

    document.getElementById("optionB").value = "";

    document.getElementById("optionC").value = "";

    document.getElementById("optionD").value = "";

    document.getElementById("correctAnswer").value = "";

}


// =====================================
// ADMIN DASHBOARD DATA
// =====================================

function loadAdminDashboard() {

    const questions =
        JSON.parse(
            localStorage.getItem("questions")
        ) || [];


    const data =
        JSON.parse(
            localStorage.getItem("performanceData")
        ) || [];


    const totalQuestions =
        questions.length;


    const totalExams =
        data.length;


    let averagePerformance = 0;

    let passCount = 0;

    let failCount = 0;


    // =====================================
    // PERFORMANCE CALCULATION
    // =====================================

    if (data.length > 0) {

        const totalPercentage =
            data.reduce(function (
                sum,
                result
            ) {

                return sum +
                    Number(
                        result.percentage || 0
                    );

            }, 0);


        averagePerformance =
            totalPercentage / data.length;


        passCount =
            data.filter(function (result) {

                return String(
                    result.status
                ).toUpperCase() === "PASS";

            }).length;


        failCount =
            data.length - passCount;

    }


    // =====================================
    // DASHBOARD ELEMENTS
    // =====================================

    const totalQuestionsElement =
        document.getElementById(
            "totalQuestions"
        );


    const totalExamsElement =
        document.getElementById(
            "totalExams"
        );


    const averagePerformanceElement =
        document.getElementById(
            "averagePerformance"
        );


    const passFailElement =
        document.getElementById(
            "passFail"
        );


    if (totalQuestionsElement) {

        totalQuestionsElement.innerText =
            totalQuestions;

    }


    if (totalExamsElement) {

        totalExamsElement.innerText =
            totalExams;

    }


    if (averagePerformanceElement) {

        averagePerformanceElement.innerText =
            averagePerformance.toFixed(2) +
            "%";

    }


    if (passFailElement) {

        passFailElement.innerText =
            passCount +
            " Pass / " +
            failCount +
            " Fail";

    }


    // =====================================
    // HIGHEST SCORE
    // =====================================

    const highestScoreElement =
        document.getElementById(
            "highestScore"
        );


    if (highestScoreElement) {

        if (data.length > 0) {

            const highest =
                Math.max.apply(
                    null,

                    data.map(function (result) {

                        return Number(
                            result.percentage || 0
                        );

                    })

                );


            highestScoreElement.innerText =
                highest.toFixed(2) + "%";

        } else {

            highestScoreElement.innerText =
                "0%";
        }
    }


    // =====================================
    // SUBJECT PERFORMANCE
    // =====================================

    const subjectElement =
        document.getElementById(
            "subjectPerformance"
        );


    if (subjectElement) {

        if (data.length > 0) {

            subjectElement.innerText =
                "Computer - " +
                averagePerformance.toFixed(2) +
                "%";

        } else {

            subjectElement.innerText =
                "No performance data available";
        }
    }


    // =====================================
    // IMPROVEMENT TREND
    // =====================================

    const trendElement =
        document.getElementById(
            "improvementTrend"
        );


    if (trendElement) {

        if (data.length >= 2) {

            const first =
                Number(
                    data[0].percentage || 0
                );


            const last =
                Number(
                    data[data.length - 1].percentage || 0
                );


            if (last > first) {

                trendElement.innerText =
                    "Improving ↑";

            }

            else if (last < first) {

                trendElement.innerText =
                    "Needs Improvement ↓";

            }

            else {

                trendElement.innerText =
                    "Stable →";
            }

        } else {

            trendElement.innerText =
                "Not enough data";
        }
    }
}


// =====================================
// DISPLAY EXISTING QUESTIONS
// =====================================

function displayQuestions() {

    const questionList =
        document.getElementById("questionList");


    if (!questionList) {
        return;
    }


    const questions =
        JSON.parse(
            localStorage.getItem("questions")
        ) || [];


    questionList.innerHTML = "";


    // =====================================
    // NO QUESTIONS
    // =====================================

    if (questions.length === 0) {

        questionList.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
                color:#64748b;
                background:#f8fafc;
                border-radius:12px;
            ">

                <h3>No questions available</h3>

                <p>
                    Add questions to the Smart Question Bank.
                </p>

            </div>
        `;

        return;
    }


    // =====================================
    // DISPLAY QUESTIONS
    // =====================================

    questions.forEach(function (q, index) {

        const questionCard =
            document.createElement("div");


        // =====================================
        // CARD STYLE
        // =====================================

        questionCard.style.padding =
            "20px";

        questionCard.style.marginBottom =
            "15px";

        questionCard.style.border =
            "1px solid #e2e8f0";

        questionCard.style.borderRadius =
            "14px";

        questionCard.style.background =
            "#ffffff";

        questionCard.style.boxShadow =
            "0 4px 12px rgba(0,0,0,0.06)";


        // =====================================
        // QUESTION CONTENT
        // =====================================

        questionCard.innerHTML = `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:12px;
                gap:10px;
                flex-wrap:wrap;
            ">

                <h3 style="
                    margin:0;
                    color:#1e3a8a;
                    font-size:18px;
                ">
                    Question ${index + 1}
                </h3>

                <span style="
                    background:#eff6ff;
                    color:#2563eb;
                    padding:5px 10px;
                    border-radius:20px;
                    font-size:13px;
                    font-weight:600;
                ">
                    ${q.difficulty}
                </span>

            </div>


            <p style="
                font-size:16px;
                font-weight:600;
                color:#1e293b;
                margin-bottom:14px;
            ">
                ${q.question}
            </p>


            <div style="
                display:grid;
                gap:7px;
                color:#475569;
                font-size:14px;
            ">

                <p style="margin:0;">
                    <strong>A.</strong>
                    ${q.optionA}
                </p>

                <p style="margin:0;">
                    <strong>B.</strong>
                    ${q.optionB}
                </p>

                <p style="margin:0;">
                    <strong>C.</strong>
                    ${q.optionC}
                </p>

                <p style="margin:0;">
                    <strong>D.</strong>
                    ${q.optionD}
                </p>

            </div>


            <div style="
                margin-top:15px;
                padding-top:12px;
                border-top:1px solid #e2e8f0;
                color:#475569;
                font-size:14px;
            ">

                <p style="margin:5px 0;">
                    <strong>Correct Answer:</strong>
                    Option ${q.correctAnswer}
                </p>

                <p style="margin:5px 0;">
                    <strong>Subject:</strong>
                    ${q.subject}
                </p>

                <p style="margin:5px 0;">
                    <strong>Topic:</strong>
                    ${q.topic}
                </p>

            </div>


            <!-- DELETE BUTTON -->

            <div style="
                margin-top:16px;
                display:flex;
                justify-content:flex-end;
            ">

                <button
                    type="button"
                    onclick="deleteQuestion(${q.id})"
                    style="
                        background:#dc2626;
                        color:white;
                        border:none;
                        padding:8px 15px;
                        border-radius:7px;
                        cursor:pointer;
                        font-size:13px;
                        font-weight:600;
                    "
                    onmouseover="
                        this.style.background='#b91c1c'
                    "
                    onmouseout="
                        this.style.background='#dc2626'
                    "
                >
                    🗑 Delete
                </button>

            </div>

        `;


        questionList.appendChild(
            questionCard
        );

    });
}


// =====================================
// DELETE ONE QUESTION
// =====================================

function deleteQuestion(questionId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this question?"
        );


    if (!confirmDelete) {
        return;
    }


    // =====================================
    // DELETE FROM QUESTION BANK
    // =====================================

    let questions =
        JSON.parse(
            localStorage.getItem("questions")
        ) || [];


    questions =
        questions.filter(
            function (question) {

                return Number(question.id) !==
                    Number(questionId);

            }
        );


    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );


    // =====================================
    // DELETE FROM EXAMS ALSO
    // =====================================

    let exams =
        JSON.parse(
            localStorage.getItem("exams")
        ) || [];


    exams.forEach(function (exam) {

        if (
            Array.isArray(
                exam.questions
            )
        ) {

            exam.questions =
                exam.questions.filter(
                    function (question) {

                        return Number(
                            question.id
                        ) !==
                            Number(questionId);

                    }
                );

        }

    });


    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    // =====================================
    // SUCCESS MESSAGE
    // =====================================

    alert(
        "Question deleted successfully!"
    );


    // =====================================
    // REFRESH
    // =====================================

    displayQuestions();

    loadAdminDashboard();

}


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const username =
            localStorage.getItem(
                "loggedInUser"
            );


        const welcome =
            document.getElementById(
                "welcomeAdmin"
            );


        if (
            username &&
            welcome
        ) {

            welcome.innerText =
                "Welcome, " +
                username +
                " 👋";

        }


        loadAdminDashboard();

        displayQuestions();

    }
);


// =====================================
// EXPORT STUDENT RESULTS TO EXCEL
// =====================================

function exportToExcel() {

    const performanceData =
        JSON.parse(
            localStorage.getItem(
                "performanceData"
            )
        ) || [];


    if (performanceData.length === 0) {

        alert(
            "No student results available."
        );

        return;
    }


    // =====================================
    // STUDENT RESULTS
    // =====================================

    const excelData =
        performanceData.map(
            function (result, index) {

                return [

                    index + 1,

                    result.studentName ||
                    result.username ||
                    "Student",

                    result.exam ||
                    "Digital Smart Exam",

                    result.subject ||
                    "Computer",

                    Number(result.score) || 0,

                    Number(
                        result.totalQuestions
                    ) || 0,

                    Number(
                        result.percentage || 0
                    ).toFixed(2) + "%",

                    result.status || "-",

                    result.date || ""

                ];

            }
        );


    // =====================================
    // CALCULATIONS
    // =====================================

    const marks =
        performanceData.map(
            function (result) {

                return Number(
                    result.score
                ) || 0;

            }
        );


    const totalMarksList =
        performanceData.map(
            function (result) {

                return Number(
                    result.totalQuestions
                ) || 0;

            }
        );


    const percentages =
        performanceData.map(
            function (result) {

                return Number(
                    result.percentage
                ) || 0;

            }
        );


    const totalStudents =
        performanceData.length;


    const totalObtainedMarks =
        marks.reduce(
            function (sum, mark) {

                return sum + mark;

            },
            0
        );


    const totalPossibleMarks =
        totalMarksList.reduce(
            function (sum, mark) {

                return sum + mark;

            },
            0
        );


    const averageMarks =
        totalStudents > 0
            ? totalObtainedMarks /
            totalStudents
            : 0;


    const highestMark =
        marks.length > 0
            ? Math.max(...marks)
            : 0;


    const lowestMark =
        marks.length > 0
            ? Math.min(...marks)
            : 0;


    // =====================================
    // MEDIAN
    // =====================================

    const sortedMarks =
        [...marks].sort(
            function (a, b) {

                return a - b;

            }
        );


    let medianMark = 0;


    if (sortedMarks.length > 0) {

        const middle =
            Math.floor(
                sortedMarks.length / 2
            );


        if (
            sortedMarks.length % 2 === 0
        ) {

            medianMark =
                (
                    sortedMarks[middle - 1] +
                    sortedMarks[middle]
                ) / 2;

        }

        else {

            medianMark =
                sortedMarks[middle];

        }

    }


    // =====================================
    // AVERAGE PERCENTAGE
    // =====================================

    const averagePercentage =
        percentages.length > 0

            ? percentages.reduce(
                function (sum, value) {

                    return sum + value;

                },
                0
            ) / percentages.length

            : 0;


    // =====================================
    // PASS / FAIL
    // =====================================

    const passCount =
        performanceData.filter(
            function (result) {

                return String(
                    result.status
                ).toUpperCase() === "PASS";

            }
        ).length;


    const failCount =
        performanceData.filter(
            function (result) {

                return String(
                    result.status
                ).toUpperCase() === "FAIL";

            }
        ).length;


    const passPercentage =
        totalStudents > 0
            ? (
                passCount /
                totalStudents
            ) * 100
            : 0;


    const failPercentage =
        totalStudents > 0
            ? (
                failCount /
                totalStudents
            ) * 100
            : 0;


    // =====================================
    // PERFORMANCE LEVEL
    // =====================================

    let performanceLevel =
        "Needs Improvement";


    if (averagePercentage >= 80) {

        performanceLevel =
            "Excellent";

    }

    else if (averagePercentage >= 60) {

        performanceLevel =
            "Good";

    }

    else if (averagePercentage >= 40) {

        performanceLevel =
            "Average";

    }


    // =====================================
    // CREATE EXCEL WORKBOOK
    // =====================================

    const workbook =
        XLSX.utils.book_new();


    const sheetData = [];


    sheetData.push([
        "DIGITAL SMART EXAM MANAGEMENT SYSTEM"
    ]);


    sheetData.push([
        "STUDENT RESULTS & PERFORMANCE REPORT"
    ]);


    sheetData.push([]);


    // =====================================
    // STUDENT RESULTS
    // =====================================

    sheetData.push([
        "STUDENT RESULTS"
    ]);


    sheetData.push([

        "S.No",
        "Name",
        "Exam",
        "Subject",
        "Marks",
        "Total Marks",
        "Percentage",
        "Result",
        "Date"

    ]);


    excelData.forEach(
        function (row) {

            sheetData.push(row);

        }
    );


    sheetData.push([]);

    sheetData.push([]);


    // =====================================
    // PERFORMANCE SUMMARY
    // =====================================

    sheetData.push([
        "PERFORMANCE SUMMARY"
    ]);


    sheetData.push([

        "Metric",
        "Value",
        "Metric",
        "Value"

    ]);


    sheetData.push([

        "Total Students",
        totalStudents,

        "Total Obtained Marks",
        totalObtainedMarks

    ]);


    sheetData.push([

        "Total Possible Marks",
        totalPossibleMarks,

        "Average Marks",
        averageMarks.toFixed(2)

    ]);


    sheetData.push([

        "Middle / Median Score",
        medianMark.toFixed(2),

        "Highest Mark",
        highestMark

    ]);


    sheetData.push([

        "Lowest Mark",
        lowestMark,

        "Average Percentage",
        averagePercentage.toFixed(2) + "%"

    ]);


    sheetData.push([

        "Pass Count",
        passCount,

        "Fail Count",
        failCount

    ]);


    sheetData.push([

        "Pass Percentage",
        passPercentage.toFixed(2) + "%",

        "Fail Percentage",
        failPercentage.toFixed(2) + "%"

    ]);


    sheetData.push([

        "Overall Performance",
        performanceLevel,
        "",
        ""

    ]);


    // =====================================
    // CREATE WORKSHEET
    // =====================================

    const worksheet =
        XLSX.utils.aoa_to_sheet(
            sheetData
        );


    // =====================================
    // COLUMN WIDTH
    // =====================================

    worksheet["!cols"] = [

        { wch: 10 },
        { wch: 22 },
        { wch: 28 },
        { wch: 20 },
        { wch: 12 },
        { wch: 15 },
        { wch: 15 },
        { wch: 14 },
        { wch: 22 }

    ];


    // =====================================
    // ADD SHEET
    // =====================================

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Exam Report"
    );


    // =====================================
    // DOWNLOAD EXCEL
    // =====================================

    XLSX.writeFile(
        workbook,
        "Digital_Smart_Exam_Report.xlsx"
    );


    alert(
        "Complete Exam Report exported successfully!"
    );

}