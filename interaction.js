// interaction.js
// GOLD STANDARD TEST DEBUG VERSION
// Purpose: verify SCORM Cloud connection first
// No timers, no localStorage dependency complexity

/* -------------------------------
   FILE LOADED CHECK
-------------------------------- */
alert("interaction.js loaded");
console.log("interaction.js loaded");


/* -------------------------------
   CONFIGURATION
   Replace YOUR_REAL_BASE64_TOKEN
-------------------------------- */
ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/",
    auth: "Basic YOUR_REAL_BASE64_TOKEN"
});


/* -------------------------------
   PAGE LOAD TEST
-------------------------------- */
window.addEventListener("load", function () {

    alert("portfolio page loaded");
    console.log("portfolio page loaded");

    runDebugTest();
});


/* -------------------------------
   MAIN TEST FUNCTION
-------------------------------- */
function runDebugTest() {

    let statementInfo = {

        actor: {
            mbox: "mailto:test@example.com",
            name: "Test User",
            objectType: "Agent"
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: {
                "en-US": "experienced"
            }
        },

        object: {
            id: "https://example.com/test-portfolio",
            objectType: "Activity",
            definition: {
                name: {
                    "en-US": "Portfolio Debug Test"
                },
                description: {
                    "en-US": "Testing xAPI connection to SCORM Cloud"
                }
            }
        }
    };

    console.log("TEST STATEMENT:");
    console.log(JSON.stringify(statementInfo, null, 2));

    alert("Sending test statement now...");

    ADL.XAPIWrapper.sendStatement(
        statementInfo,
        function (resp) {

            console.log("FULL RESPONSE:", resp);
            console.log("STATUS:", resp.status);
            console.log("TEXT:", resp.responseText);

            alert("HTTP Status: " + resp.status);

            if (resp.responseText) {
                alert(resp.responseText);
            }
        }
    );
}
