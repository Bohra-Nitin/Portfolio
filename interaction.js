// Variables
let userName = "";
let emailAddress = "";
let objectID = "https://yourdomain.com/portfolio";

/* Get data from form page */
window.onload = function () {
    userName = localStorage.getItem("username");
    emailAddress = localStorage.getItem("email");

    /* If user opens portfolio directly */
    if (!userName || !emailAddress) {
        alert("Please enter Name and Email first.");
        window.location.href = "index.html";
    }
};


/* Called when user clicks Visit Portfolio button */
function sendVisited() {
    sendStatement(
        "http://adlnet.gov/expapi/verbs/experienced",
        "visited",
        "Personal Portfolio",
        "User visited the portfolio website."
    );
}


/* Generic xAPI Statement Function */
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

    console.log("xAPI Statement Sent");
}