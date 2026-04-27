// interaction.js
// SIMPLE DEBUG VERSION

alert("interaction.js loaded");

/* SCORM Cloud Config */
ADL.XAPIWrapper.changeConfig({
    endpoint: "https://cloud.scorm.com/lrs/KWZLKQZD7M/sandbox/statements",
    auth: "Basic YOUR_REAL_BASE64_TOKEN"
});

/* Run when portfolio.html opens */
window.addEventListener("load", function () {

    alert("portfolio page loaded");

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
            id: "https://example.com/test",
            objectType: "Activity"
        }
    };

    ADL.XAPIWrapper.sendStatement(statementInfo, function(resp){

        console.log(resp);
        alert("Status: " + resp.status);

    });

});
