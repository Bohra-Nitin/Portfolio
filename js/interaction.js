// ============================================================
// interaction.js (FINAL RELIABLE VERSION)
// - Uses ADL wrapper for ALL statements
// - Fixes LRS auth issue (no sendBeacon)
// - Uses visibilitychange for better reliability
// ============================================================



// ============================================================
// INDEX PAGE (Form Submit)
// ============================================================
function submitForm() {

    let userName = document.getElementById("nameEntered").value.trim();
    let userEmail = document.getElementById("userEmail").value.trim();

    // Basic validation
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

    // Redirect to portfolio
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

    // Safety fallback
    if (!userName || !userEmail) return;

    // Show welcome message
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
            id: window.location.href,
            definition: {
                name: { "en-US": "Portfolio Page" }
            }
        }
    };

    // Send "experienced" statement
    ADL.XAPIWrapper.sendStatement(statement1);
}





// ============================================================
// SEND TIME SPENT
// Statement 2 = completed
// ============================================================
function sendTimeSpent() {

    if (statementSent) return;

    statementSent = true;

    let endTime = Date.now();
    let totalSeconds = Math.round((endTime - startTime) / 1000);

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    // Safety fallback
    if (!userName || !userEmail) return;

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
            id: window.location.href + "/time-tracking",
            definition: {
                name: {
                    "en-US":
                        userName +
                        "has spent " +
                        totalSeconds +
                        " seconds on the Portfolio webpage"
                }
            }
        },

        result: {
            duration: "PT" + totalSeconds + "S"
        }
    };

    // Send "completed" statement
    ADL.XAPIWrapper.sendStatement(statement2);
}





// ============================================================
// PAGE EXIT HANDLING (MOST RELIABLE)
// ============================================================

// Fires when tab becomes hidden (best modern method)
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        sendTimeSpent();
    }
});

// Fallback (older browsers)
window.addEventListener("beforeunload", function () {
    sendTimeSpent();
});
