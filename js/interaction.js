// ============================================================
// interaction.js (FINAL COMPLETE VERSION)
// Tracks:
// ✅ User from form (name/email)
// ✅ "experienced" on every page
// ✅ Total session time (multi-page)
// ✅ Page-wise time
// ✅ Active vs Idle time
// ✅ Works for tab close + browser close
// ============================================================



// ============================================================
// CONFIG
// ============================================================
const IDLE_LIMIT = 15000; // 15 seconds idle



// ============================================================
// FORM PAGE (index.html)
// ============================================================
function submitForm() {

    let userName = document.getElementById("nameEntered").value.trim();
    let userEmail = document.getElementById("userEmail").value.trim();

    if (userName === "" || userEmail === "") {
        alert("Please enter name and email");
        return;
    }

    if (!userEmail.includes("@")) {
        alert("Enter valid email");
        return;
    }

    localStorage.setItem("visitorName", userName);
    localStorage.setItem("visitorEmail", userEmail);

    window.location.href = "portfolio.html";
}



// ============================================================
// INITIALIZE TRACKING (CALL ON EVERY PAGE LOAD)
// <body onload="initTracking()">
// ============================================================
function initTracking() {

    // Start session only once
    if (!localStorage.getItem("sessionStartTime")) {
        localStorage.setItem("sessionStartTime", Date.now());
        localStorage.setItem("totalActiveTime", 0);
        localStorage.setItem("pagesVisited", JSON.stringify([]));
        localStorage.setItem("sessionEnded", "false");
    }

    // Send experienced statement
    sendExperiencedStatement();

    startPageTracking();
    setupActivityTracking();
}



// ============================================================
// EXPERIENCED STATEMENT (EVERY PAGE)
// ============================================================
function sendExperiencedStatement() {

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    if (!userName || !userEmail) return;

    let statement = {
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
                name: { "en-US": document.title }
            }
        }
    };

    ADL.XAPIWrapper.sendStatement(statement);
}



// ============================================================
// PAGE TRACKING
// ============================================================
function startPageTracking() {

    let pages = JSON.parse(localStorage.getItem("pagesVisited"));

    let currentPage = document.title;

    pages.push({
        page: currentPage,
        start: Date.now()
    });

    localStorage.setItem("pagesVisited", JSON.stringify(pages));
}



// ============================================================
// ACTIVE / IDLE TRACKING
// ============================================================
let lastActivityTime = Date.now();

function setupActivityTracking() {

    function markActivity() {
        lastActivityTime = Date.now();
    }

    ["mousemove", "click", "keydown", "scroll"].forEach(event => {
        document.addEventListener(event, markActivity);
    });

    // Track active time every second
    setInterval(() => {

        let now = Date.now();

        let totalActive = parseInt(localStorage.getItem("totalActiveTime"));

        if (now - lastActivityTime < IDLE_LIMIT) {
            totalActive += 1;
        }

        localStorage.setItem("totalActiveTime", totalActive);

    }, 1000);
}



// ============================================================
// FINAL STATEMENT (ON EXIT)
// ============================================================
function sendFinalStatement() {

    if (localStorage.getItem("sessionEnded") === "true") return;

    localStorage.setItem("sessionEnded", "true");

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    if (!userName || !userEmail) return;

    let sessionStart = parseInt(localStorage.getItem("sessionStartTime"));
    let totalTime = Math.round((Date.now() - sessionStart) / 1000);

    let activeTime = parseInt(localStorage.getItem("totalActiveTime"));

    let pages = JSON.parse(localStorage.getItem("pagesVisited"));



    // ============================================================
    // MAIN SESSION STATEMENT
    // ============================================================
    let statement = {
        actor: {
            name: userName,
            mbox: "mailto:" + userEmail
        },

        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: { "en-US": "completed" }
        },

        object: {
            id: "portfolio-session",
            definition: {
                name: { "en-US": "Portfolio Session" }
            }
        },

        result: {
            duration: "PT" + totalTime + "S"
        },

        context: {
            extensions: {
                "https://portfolio/activeTime": activeTime,
                "https://portfolio/pagesVisited": pages
            }
        }
    };

    ADL.XAPIWrapper.sendStatement(statement);



    // ============================================================
    // OPTIONAL: PAGE-WISE STATEMENTS
    // ============================================================
    pages.forEach(p => {

        let duration = Math.round((Date.now() - p.start) / 1000);

        let pageStatement = {
            actor: {
                name: userName,
                mbox: "mailto:" + userEmail
            },

            verb: {
                id: "http://adlnet.gov/expapi/verbs/interacted",
                display: { "en-US": "interacted" }
            },

            object: {
                id: window.location.origin + "/" + p.page,
                definition: {
                    name: { "en-US": p.page }
                }
            },

            result: {
                duration: "PT" + duration + "S"
            }
        };

        ADL.XAPIWrapper.sendStatement(pageStatement);
    });



    // ============================================================
    // CLEANUP (SAFE)
    // ============================================================
    localStorage.removeItem("sessionStartTime");
    localStorage.removeItem("totalActiveTime");
    localStorage.removeItem("pagesVisited");
    localStorage.removeItem("sessionEnded");
}



// ============================================================
// EXIT EVENTS (CRITICAL)
// ============================================================

// Best trigger (tab switch, close, minimize)
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        sendFinalStatement();
    }
});

// Fallback
window.addEventListener("beforeunload", function () {
    sendFinalStatement();
});
