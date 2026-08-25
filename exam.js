// =====================================
// DIGITAL SMART EXAM
// EXAM JAVASCRIPT
// =====================================

let questions = [];
let currentQuestion = 0;
let answers = [];


// =====================================
// PAGE LOAD
// =====================================

window.addEventListener("DOMContentLoaded", function () {

    loadQuestions();

});


// =====================================
// LOAD QUESTIONS
// =====================================

function loadQuestions() {

    // Get questions saved from Add Questions page
    const savedQuestions =
        JSON.parse(localStorage.getItem("questions")) || [];

    questions = savedQuestions;

    // If questions are not found
    if (questions.length === 0) {

        document.getElementById("questionContainer").innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
                color:#64748b;
            ">

                <h3>No Questions Available</h3>

                <p>
                    Please add questions before starting the exam.
                </p>

            </div>
        `;

        return;
    }


    // Create answer array
    answers = new Array(questions.length).fill(null);

    showQuestion();

}


// =====================================
// SHOW QUESTION
// =====================================

function showQuestion() {

    const container =
        document.getElementById("questionContainer");

    if (!container) {
        return;
    }


    const question =
        questions[currentQuestion];


    // Question text
    const questionText =
        question.question ||
        question.text ||
        question.questionText ||
        "Question";


    // Options
    const optionA =
        question.optionA || "";

    const optionB =
        question.optionB || "";

    const optionC =
        question.optionC || "";

    const optionD =
        question.optionD || "";


    // Previous button
    const previousButton =
        document.querySelector(
            ".exam-btn.secondary"
        );

    if (previousButton) {

        previousButton.style.display =
            currentQuestion === 0
                ? "none"
                : "block";
    }


    // Build question
    container.innerHTML = `

        <div class="question-number">
            Question ${currentQuestion + 1}
            of ${questions.length}
        </div>


        <h2>
            ${questionText}
        </h2>


        <div class="options">

            <div class="option">

                <input
                    type="radio"
                    name="answer"
                    id="optionA"
                    value="A"
                    ${answers[currentQuestion] === "A" ? "checked" : ""}
                >

                <label for="optionA">
                    A. ${optionA}
                </label>

            </div>


            <div class="option">

                <input
                    type="radio"
                    name="answer"
                    id="optionB"
                    value="B"
                    ${answers[currentQuestion] === "B" ? "checked" : ""}
                >

                <label for="optionB">
                    B. ${optionB}
                </label>

            </div>


            <div class="option">

                <input
                    type="radio"
                    name="answer"
                    id="optionC"
                    value="C"
                    ${answers[currentQuestion] === "C" ? "checked" : ""}
                >

                <label for="optionC">
                    C. ${optionC}
                </label>

            </div>


            <div class="option">

                <input
                    type="radio"
                    name="answer"
                    id="optionD"
                    value="D"
                    ${answers[currentQuestion] === "D" ? "checked" : ""}
                >

                <label for="optionD">
                    D. ${optionD}
                </label>

            </div>

        </div>

    `;


    // Change Next button text
    const nextButton =
        document.querySelector(
            ".exam-btn:not(.secondary)"
        );

    if (nextButton) {

        if (currentQuestion === questions.length - 1) {

            nextButton.innerText =
                "Finish →";

        } else {

            nextButton.innerText =
                "Next →";
        }
    }

}


// =====================================
// SAVE CURRENT ANSWER
// =====================================

function saveCurrentAnswer() {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (selected) {

        answers[currentQuestion] =
            selected.value;

    }

}


// =====================================
// NEXT QUESTION
// =====================================

function nextQuestion() {

    saveCurrentAnswer();


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        submitExam();

    }

}


// =====================================
// PREVIOUS QUESTION
// =====================================

function previousQuestion() {

    saveCurrentAnswer();


    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


// =====================================
// SUBMIT EXAM
// =====================================

function submitExam() {

    saveCurrentAnswer();


    if (questions.length === 0) {
        return;
    }


    // Count correct answers
    let score = 0;


    questions.forEach(function (question, index) {

        const correctAnswer =
            question.correctAnswer ||
            question.answer ||
            question.correct ||
            "";

        if (
            String(answers[index]).toUpperCase() ===
            String(correctAnswer).toUpperCase()
        ) {

            score++;

        }

    });


    // Wrong answers
    const wrongAnswers =
        questions.length - score;


    // Percentage
    const percentage =
        (score / questions.length) * 100;


    // Pass / Fail
    const status =
        percentage >= 50
            ? "PASS"
            : "FAIL";


    // Performance
    let performance = "Needs Improvement";

    if (percentage >= 80) {

        performance = "Excellent";

    } else if (percentage >= 60) {

        performance = "Good";

    } else if (percentage >= 50) {

        performance = "Average";

    }


    // =================================
    // RESULT OBJECT
    // =================================

    const result = {

        subject: "Computer",

        totalQuestions:
            questions.length,

        correctAnswers:
            score,

        wrongAnswers:
            wrongAnswers,

        score:
            score,

        percentage:
            percentage,

        status:
            status,

        performance:
            performance,

        date:
            new Date().toLocaleString()

    };


    // =================================
    // SAVE RESULT
    // =================================

    const oldResults =
        JSON.parse(
            localStorage.getItem("performanceData")
        ) || [];


    oldResults.push(result);


    localStorage.setItem(
        "performanceData",
        JSON.stringify(oldResults)
    );


    // =================================
    // GO TO RESULT PAGE
    // =================================

    window.location.href =
        "performance.html";

}