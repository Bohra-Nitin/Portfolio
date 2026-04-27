// interaction.js

ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/",
    auth: "Basic YOUR_BASE64_CREDENTIALS"
});

let userName = "";
let emailAddress = "";
let objectID = "https://bohra-nitin.github.io/Portfolio/";

let startTime = 0;


/* -------------------------
   Page Load
------------------------- */
window.onload = function () {

    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    if (userName && emailAddress) {

        startTime = new Date().getTime();

        sendVisited();
    }
};


/* -------------------------
   When User Leaves Page
------------------------- */
window.addEventListener("beforeunload", function () {

    if (startTime > 0) {

        let endTime = new Date().getTime();

        let secondsSpent = Math.round((endTime - startTime) / 1000);

        sendTimeSpent(secondsSpent);
    }
});


/* -------------------------
   Visit Statement
------------------------- */
function sendVisited() {

    sendStatement(
        "http://adlnet.gov/expapi/verbs/experienced",
        "visited",
        "Portfolio",
        "User opened portfolio page."
    );
}


/* -------------------------
   Time Spent Statement
------------------------- */
function sendTimeSpent(seconds) {

    let statementInfo = {
        actor: {
            mbox: "mailto:" + emailAddress,
            name: userName,
            objectType: "Agent"
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/exited",
            display: {
                "en-US": "exited"
            }
        },

        object: {
            id: objectID,
            objectType: "Activity"
        },

        result: {
            duration: "PT" + seconds + "S"
        }
    };

    ADL.XAPIWrapper.sendStatement(statementInfo);
}


/* -------------------------
   Generic Statement
------------------------- */
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

    ADL.XAPIWrapper.sendStatement(statementInfo);
}
