// ============================================================
// ADVANCED interaction.js
// Tracks:
// ✅ Total session time (multi-page)
// ✅ Page-wise time
// ✅ Active vs Idle time
// ============================================================



// ============================================================
// CONFIG
// ============================================================
const IDLE_LIMIT = 15000; // 15 sec idle



// ============================================================
// SESSION INIT (runs on EVERY page)
// ============================================================
function initTracking() {

    // Start session only once
    if (!localStorage.getItem("sessionStartTime")) {
        localStorage.setItem("sessionStartTime", Date.now());
        localStorage.setItem("totalActiveTime", 0);
        localStorage.setItem("pagesVisited", JSON.stringify([]));
        localStorage.setItem("sessionEnded", "false");
    }

    startPageTracking();
    setupActivityTracking();
}



// ============================================================
// PAGE TRACKING
// ============================================================
let pageStartTime = Date.now();

function startPageTracking() {

    let pages = JSON.parse(localStorage.getItem("pagesVisited"));

    let currentPage = window.location.pathname;

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
let activeTime = 0;

function setupActivityTracking() {

    function markActivity() {
        lastActivityTime = Date.now();
    }

    ["mousemove", "click", "keydown", "scroll"].forEach(event => {
        document.addEventListener(event, markActivity);
    });

    // track active time every second
    setInterval(() => {

        let now = Date.now();

        if (now - lastActivityTime < IDLE_LIMIT) {
            activeTime += 1;
        }

        localStorage.setItem("totalActiveTime",
            parseInt(localStorage.getItem("totalActiveTime")) + 1
        );

    }, 1000);
}



// ============================================================
// SEND FINAL DATA
// ============================================================
function sendFinalStatement() {

    if (localStorage.getItem("sessionEnded") === "true") return;

    localStorage.setItem("sessionEnded", "true");

    let userName = localStorage.getItem("visitorName");
    let userEmail = localStorage.getItem("visitorEmail");

    let sessionStart = parseInt(localStorage.getItem("sessionStartTime"));
    let totalTime = Math.round((Date.now() - sessionStart) / 1000);

    let activeTime = parseInt(localStorage.getItem("totalActiveTime"));

    let pages = JSON.parse(localStorage.getItem("pagesVisited"));



    // ============================================================
    // MAIN STATEMENT (TOTAL SESSION)
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
                name: {
                    "en-US": "Portfolio Session Tracking"
                }
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
                id: window.location.origin + p.page,
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



    // cleanup
    localStorage.clear();
}



// ============================================================
// EXIT EVENTS (CRITICAL)
// ============================================================
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        sendFinalStatement();
    }
});

window.addEventListener("beforeunload", function () {
    sendFinalStatement();
});
