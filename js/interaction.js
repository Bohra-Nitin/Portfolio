// ============================================================
// interaction.js
// ============================================================


// ============================================================
// INDEX PAGE (WITH TRACKING)
// ============================================================
function submitForm() {

    let userName = document.getElementById("nameEntered").value.trim();
    let userEmail = document.getElementById("userEmail").value.trim();

    // Validation
    if (userName === "" || userEmail === "") {
        alert("Please enter name and email");
        return;
    }

    if (!userEmail.includes("@")) {
        alert("Please enter a valid email");
        return;
    }

    // Store user data
    localStorage.setItem("visitorName", userName);
    localStorage.setItem("visitorEmail", userEmail);

    // Tracking enabled
    localStorage.setItem("trackingEnabled", "true");

    // Redirect
    window.location.href = "portfolio.html";
}





// ============================================================
// SKIP TRACKING
// Uses dummy data
// ============================================================
function skipTracking() {

    // Dummy anonymous user
    localStorage.setItem("visitorName", "Anonymous Visitor");
    localStorage.setItem("visitorEmail", "anonymous@example.com");

    // Tracking disabled flag
    localStorage.setItem("trackingEnabled", "false");

    // Redirect
    window.location.href = "portfolio.html";
}





// ============================================================
// VARIABLES
// ============================================================
let startTime = 0;
let statementSent = false;





// ============================================================
// START TRACKING
// ============================================================
function startPortfolioTracking() {

    startTime = Date.now();

    let trackingEnabled =
        localStorage.getItem("trackingEnabled");

    // Do not track if skipped
    if (trackingEnabled !== "true") {

        // Still show welcome text
        let anonymousName =
            localStorage.getItem("visitorName");

        if (document.getElementById("welcomeUser")) {
            document.getElementById("welcomeUser").innerHTML =
                "Welcome, " + anonymousName;
        }

        return;
    }

    let userName =
        localStorage.getItem("visitorName");

    let userEmail =
        localStorage.getItem("visitorEmail");

    if (!userName || !userEmail) return;

    // Welcome message
    if (document.getElementById("welcomeUser")) {
        document.getElementById("welcomeUser").innerHTML =
            "Welcome, " + userName;
    }

    // xAPI Statement 1
    let statement1 = {

        actor: {
            name: userName,
            mbox: "mailto:" + userEmail
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: {
                "en-US": "experienced"
            }
        },

        object: {
            id: window.location.href,
            definition: {
                name: {
                    "en-US": "Portfolio Page"
                }
            }
        }
    };

    ADL.XAPIWrapper.sendStatement(statement1);
}





// ============================================================
// SEND TIME SPENT
// ============================================================
function sendTimeSpent() {

    if (statementSent) return;

    statementSent = true;

    let trackingEnabled =
        localStorage.getItem("trackingEnabled");

    // Skip tracking
    if (trackingEnabled !== "true") return;

    let endTime = Date.now();

    let totalSeconds =
        Math.round((endTime - startTime) / 1000);

    let userName =
        localStorage.getItem("visitorName");

    let userEmail =
        localStorage.getItem("visitorEmail");

    if (!userName || !userEmail) return;

    // xAPI Statement 2
    let statement2 = {

        actor: {
            name: userName,
            mbox: "mailto:" + userEmail
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: {
                "en-US": "completed"
            }
        },

        object: {
            id: window.location.href + "/time-tracking",

            definition: {
                name: {
                    "en-US":
                        userName +
                        " spent " +
                        totalSeconds +
                        " seconds on the portfolio"
                }
            }
        },

        result: {
            duration: "PT" + totalSeconds + "S"
        }
    };

    ADL.XAPIWrapper.sendStatement(statement2);
}





// ============================================================
// PAGE EXIT HANDLING
// ============================================================

// Modern reliable method
document.addEventListener("visibilitychange", function () {

    if (document.visibilityState === "hidden") {
        sendTimeSpent();
    }

});

// Older browser fallback
window.addEventListener("beforeunload", function () {

    sendTimeSpent();

});
