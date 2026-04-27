// interaction.js

alert("interaction.js loaded");
console.log("interaction.js loaded");

ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/",
    auth: "Basic REAL_BASE64_HERE"
});

let userName = "";
let emailAddress = "";
let objectID = "https://bohra-nitin.github.io/Portfolio/";
let startTime = 0;


/* PAGE LOAD */
window.addEventListener("load", function () {

    console.log("portfolio loaded");

    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    console.log("Name:", userName);
    console.log("Email:", emailAddress);

    if (userName && emailAddress) {
        startTime = Date.now();
        sendVisited();
    }
});


/* PAGE EXIT */
window.addEventListener("beforeunload", function () {

    if (startTime > 0) {
        let secondsSpent = Math.round((Date.now() - startTime) / 1000);
        sendTimeSpent(secondsSpent);
    }
});


function sendVisited() {

    sendStatement(
        "http://adlnet.gov/expapi/verbs/experienced",
        "experienced",
        "Portfolio",
        "User opened portfolio page."
    );
}


function sendTimeSpent(seconds) {

    let statementInfo = {
        actor: {
            mbox: "mailto:" + emailAddress,
            name: userName,
            objectType: "Agent"
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/exited",
            display: {"en-US":"exited"}
        },

        object: {
            id: objectID,
            objectType: "Activity"
        },

        result: {
            duration: "PT" + seconds + "S"
        }
    };

    ADL.XAPIWrapper.sendStatement(statementInfo, function(resp){
        console.log("EXIT STATUS:", resp.status);
        console.log(resp.responseText);
    });
}


function sendStatement(verbID, verb, objName, objDesc) {

    let statementInfo = {
        actor: {
            mbox: "mailto:" + emailAddress,
            name: userName,
            objectType: "Agent"
        },

        verb: {
            id: verbID,
            display: {"en-US": verb}
        },

        object: {
            id: objectID,
            definition: {
                name: {"en-US": objName},
                description: {"en-US": objDesc}
            },
            objectType: "Activity"
        }
    };

    console.log(JSON.stringify(statementInfo, null, 2));

    ADL.XAPIWrapper.sendStatement(statementInfo, function(resp){
        console.log("VISIT STATUS:", resp.status);
        console.log(resp.responseText);
        alert("Status: " + resp.status);
    });
}
