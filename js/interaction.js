// ============================================================
// interaction.js
// RELIABLE VERSION
// Uses normal wrapper for open statement
// Uses navigator.sendBeacon() for close statement
// This solves page-close statement loss on LRS
// ============================================================



// ============================================================
// INDEX PAGE
// ============================================================
function submitForm() {

    let userName = document.getElementById("nameEntered").value.trim();
    let userEmail = document.getElementById("userEmail").value.trim();

    if (userName === "" || userEmail === "") {
        alert("Please enter name and email");
        return;
    }

    localStorage.setItem("visitorName", userName);
    localStorage.setItem("visitorEmail", userEmail);

    window.location.href = "portfolio.html";
}





// ============================================================
// VARIABLES
// ============================================================
let startTime = 0;
let statementSent = false;





// ============================================================
// WHEN PORTFOLIO LOADS
// Statement 1 = experienced
// ============================================================
function startPortfolioTracking() {

    startTime = Date.now();

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    if (document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerHTML =
            "Welcome, " + userName;
    }

    let statement1 = {
        actor: {
            name: userName,
            mbox: "mailto:" + userEmail
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: { "en-US": "experienced" }
        },

        object: {
            id: "https://yourportfolio.com/portfolio.html",
            definition: {
                name: { "en-US": "Portfolio Page" }
            }
        }
    };

    ADL.XAPIWrapper.sendStatement(statement1);
}





// ============================================================
// SEND TIME SPENT USING sendBeacon()
// ============================================================
function sendTimeSpent() {

    if (statementSent) return;

    statementSent = true;

    let endTime = Date.now();
    let totalSeconds =
        Math.round((endTime - startTime) / 1000);

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    let statement2 = {
        actor: {
            name: userName,
            mbox: "mailto:" + userEmail
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: { "en-US": "completed" }
        },

        object: {
            id: "https://yourportfolio.com/portfolio-time",
            definition: {
                name: {
                    "en-US":
                        userName +
                        " spent " +
                        totalSeconds +
                        " seconds in Portfolio"
                }
            }
        },

        result: {
            duration: "PT" + totalSeconds + "S"
        }
    };



    // =====================================================
    // Get endpoint/auth from xapiwrapper config
    // =====================================================
    let endpoint = ADL.XAPIWrapper.lrs.endpoint + "statements";

    let auth = ADL.XAPIWrapper.lrs.auth;



    // =====================================================
    // sendBeacon payload
    // =====================================================
    let blob = new Blob(
        [JSON.stringify(statement2)],
        { type: "application/json" }
    );

    navigator.sendBeacon(endpoint, blob);
}





// ============================================================
// PAGE CLOSE EVENTS
// ============================================================
window.addEventListener("pagehide", function () {
    sendTimeSpent();
});

window.addEventListener("beforeunload", function () {
    sendTimeSpent();
});