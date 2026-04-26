// interaction.js

// Variables
let userName = "";
let emailAddress = "";
let objectID = "https://yourusername.github.io/portfolio/";

/* When portfolio.html opens */
window.onload = function () {

    // Get saved data from index.html
    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    // If opened directly without entering details
    if (!userName || !emailAddress) {
        alert("Please enter Name and Email first.");
        window.location.href = "index.html";
        return;
    }

    // Auto send xAPI statement
    sendVisited();
};


/* Portfolio Visit Statement */
function sendVisited() {

    sendStatement(
        "http://adlnet.gov/expapi/verbs/experienced",
        "visited",
        "Personal Portfolio",
        "User visited the portfolio website."
    );
}


/* Generic Statement Function */
function sendStatement(verbID, verb, objName, objDesc) {

    let statementInfo = {
        actor: {
            mbox: "mailto:" + emailAddress,
            name: userName,
            objectType: "Agent"
        },

        verb: {
            id: verbID,
            display: {
                "en-US": verb
            }
        },

        object: {
            id: objectID,
            definition: {
                name: {
                    "en-US": objName
                },
                description: {
                    "en-US": objDesc
                }
            },
            objectType: "Activity"
        }
    };

    /* Send to SCORM Cloud */
    ADL.XAPIWrapper.sendStatement(statementInfo, function (response, obj) {

        console.log("SCORM Response:", response);

        if (response.status == 200 || response.status == 204) {
            alert("Success! Information sent to SCORM Cloud.");
        } else {
            alert("Failed to send information to SCORM Cloud.");
        }

    });
}
