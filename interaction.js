// interaction.js
// Simple working version

/* Configure SCORM Cloud */
ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/",
    auth: "Basic YOUR_REAL_BASE64_TOKEN"
});

/* Variables */
let userName = "";
let emailAddress = "";
let objectID = "https://bohra-nitin.github.io/Portfolio/";

/* When portfolio page opens */
window.addEventListener("load", function () {

    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    if (userName && emailAddress) {
        sendVisited();
    }
});


/* Send visit statement */
function sendVisited() {

    let statementInfo = {
        actor: {
            mbox: "mailto:" + emailAddress,
            name: userName,
            objectType: "Agent"
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: {
                "en-US": "experienced"
            }
        },

        object: {
            id: objectID,
            objectType: "Activity",
            definition: {
                name: {
                    "en-US": "Portfolio"
                },
                description: {
                    "en-US": "User visited the portfolio page."
                }
            }
        }
    };

    ADL.XAPIWrapper.sendStatement(statementInfo);
}
