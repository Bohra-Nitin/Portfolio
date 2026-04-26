// interaction.js

/* ---------------------------------
   SCORM Cloud xAPI Configuration
   Replace with your real details
---------------------------------- */
ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/",
    auth: "Basic YOUR_BASE64_CREDENTIALS"
});


/* ---------------------------------
   Variables
---------------------------------- */
let userName = "";
let emailAddress = "";
let objectID = "https://bohra-nitin.github.io/Portfolio/";


/* ---------------------------------
   Auto send only when portfolio.html loads
   and valid details already exist
---------------------------------- */
window.onload = function () {

    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    // If details exist, send statement silently
    if (userName && emailAddress) {
        sendVisited();
    }
};


/* ---------------------------------
   Called from index.html button click
---------------------------------- */
function goPortfolio() {

    let enteredName = document.getElementById("username").value.trim();
    let enteredEmail = document.getElementById("email").value.trim();

    // Show message only when button clicked
    if (enteredName === "" || enteredEmail === "") {
        alert("Please enter Name and Email first.");
        return;
    }

    // Save data
    localStorage.setItem("username", enteredName);
    localStorage.setItem("email", enteredEmail);

    // Open portfolio
    window.location.href = "portfolio.html";
}


/* ---------------------------------
   Send Portfolio Visit Statement
---------------------------------- */
function sendVisited() {

    sendStatement(
        "http://adlnet.gov/expapi/verbs/experienced",
        "visited",
        "Personal Portfolio",
        "User visited the portfolio website."
    );
}


/* ---------------------------------
   Generic xAPI Statement
---------------------------------- */
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

    // Send silently
    ADL.XAPIWrapper.sendStatement(statementInfo);
}
