window.onload = function () {

    const data =
        JSON.parse(localStorage.getItem("performanceData")) || [];

    const container =
        document.getElementById("resultsContainer");

    const totalResults =
        document.getElementById("totalResults");

    const averageScore =
        document.getElementById("averageScore");

    const passedCount =
        document.getElementById("passedCount");

    const failedCount =
        document.getElementById("failedCount");


    // No results

    if (data.length === 0) {

        totalResults.innerText = "0";
        averageScore.innerText = "0%";
        passedCount.innerText = "0";
        failedCount.innerText = "0";

        container.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                background:#f8fafc;
                border-radius:12px;
            ">

                <h3>
                    📋 No Exam Results
                </h3>

                <p style="
                    margin-top:8px;
                    color:#6b7280;
                ">
                    No student has completed an exam yet.
                </p>

            </div>
        `;

        return;
    }


    // Total exams

    totalResults.innerText =
        data.length;


    // Average score

    const totalPercentage =
        data.reduce(function (sum, result) {

            return sum +
                Number(result.percentage || 0);

        }, 0);


    const average =
        totalPercentage / data.length;


    averageScore.innerText =
        average.toFixed(2) + "%";


    // Pass / Fail

    const passed =
        data.filter(function (result) {

            return result.status === "PASS";

        }).length;


    const failed =
        data.length - passed;


    passedCount.innerText =
        passed;


    failedCount.innerText =
        failed;



    // Results display

    let html = `

        <div style="
            overflow-x:auto;
        ">

            <table style="
                width:100%;
                border-collapse:collapse;
                margin-top:10px;
            ">

                <thead>

                    <tr style="
                        background:#f8fafc;
                    ">

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            #
                        </th>

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            Student
                        </th>

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            Subject
                        </th>

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            Score
                        </th>

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            Percentage
                        </th>

                        <th style="
                            padding:14px;
                            text-align:left;
                            border-bottom:1px solid #e5e7eb;
                        ">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>
    `;


    data.forEach(function (result, index) {

        const percentage =
            Number(result.percentage || 0);


        const status =
            result.status || "FAIL";


        const username =
            result.studentName ||
            localStorage.getItem("loggedInUser") ||
            "Student";


        const subject =
            result.subject ||
            "Computer";


        const totalQuestions =
            result.totalQuestions || 0;


        const statusStyle =
            status === "PASS"