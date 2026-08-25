// =====================================
// CREATE EXAM
// =====================================

function saveExam() {

    const examName =
        document.getElementById("examName").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const duration =
        document.getElementById("duration").value.trim();

    const message =
        document.getElementById("message");


    // =====================================
    // VALIDATION
    // =====================================

    if (
        examName === "" ||
        subject === "" ||
        duration === ""
    ) {

        message.innerText =
            "Please fill all exam details.";

        message.style.color = "red";

        return;
    }


    // =====================================
    // GET EXISTING EXAMS
    // =====================================

    let exams =
        JSON.parse(localStorage.getItem("exams")) || [];


    // =====================================
    // CREATE NEW EXAM
    // =====================================

    const newExam = {

        id: Date.now(),

        examName: examName,

        subject: subject,

        duration: Number(duration),

        date: new Date().toLocaleDateString(),

        questions: []

    };


    // =====================================
    // SAVE EXAM
    // =====================================

    exams.push(newExam);

    localStorage.setItem(
        "exams",
        JSON.stringify(exams)
    );


    // =====================================
    // REMEMBER CURRENT EXAM
    // =====================================

    localStorage.setItem(
        "currentExamId",
        newExam.id
    );


    // =====================================
    // SUCCESS MESSAGE
    // =====================================

    message.innerText =
        "Exam created successfully!";

    message.style.color = "green";


    // =====================================
    // GO TO QUESTION BANK
    // =====================================

    setTimeout(function () {

        window.location.href =
            "questions.html";

    }, 800);

}


// =====================================
// BACK TO ADMIN
// =====================================

function goBack() {

    window.location.href =
        "admin.html";

}