window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
window.Script163 = function()
{
  var player = GetPlayer();
var flags = player.GetVar("CorrectFlags").split(",").map(f => f.trim());
var available = [];

for (var i = 0; i < flags.length; i++) {
  if (flags[i] !== "1") {
    available.push(i + 1); // sign indices are 1-based
  }
}

if (available.length === 0) {
  player.SetVar("SignIndex", 0); // triggers congratulations
} else {
  var index = Math.floor(Math.random() * available.length);
  var selected = available[index];
  player.SetVar("SignIndex", selected);
}

}

window.Script164 = function()
{
  var flags = player.GetVar("CorrectFlags").split(",").map(f => f.trim());
var allCorrect = flags.every(f => f === "1");

if (allCorrect) {
  player.SetVar("SignIndex", 0);
}

}

window.Script165 = function()
{
  var player = GetPlayer();
var flags = player.GetVar("CorrectFlags").split(",").map(f => f.trim());
var index = player.GetVar("SignIndex");

flags[index - 1] = "1"; // mark as correct
player.SetVar("CorrectFlags", flags.join(","));

}

window.Script166 = function()
{
  var player = GetPlayer();
var pool = player.GetVar("QuestionPool").split(",").map(s => s.trim());
var answered = player.GetVar("AnsweredFlags").split(",").map(s => s.trim());

var available = [];
for (var i = 0; i < pool.length; i++) {
  if (answered[i] !== "1") {
    available.push(i+1);
  }
}

if (available.length === 0) {
  player.SetVar("CurrentQuestion", 0); // triggers completion
} else {
  var index = Math.floor(Math.random() * available.length);
  var selected = available[index];
  player.SetVar("CurrentQuestion", selected);
}
console.log("index", index)
console.log("available",available);
console.log("answered",answered);
console.log("Cquest",CurrentQuestion);
}

window.Script167 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script168 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script169 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script170 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script171 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script172 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script173 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script174 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script175 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script176 = function()
{
  var player = GetPlayer();
var index = player.GetVar("CurrentQuestion"); // this is your question index (1-based)

var flags = player.GetVar("AnsweredFlags").split(",");
flags[index - 1] = "1"; // mark as correct
player.SetVar("AnsweredFlags", flags.join(","));

}

window.Script177 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script178 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script179 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script180 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script181 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script182 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script183 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script184 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 20); // total seconds
player.SetVar("FormattedTime", "00:20"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script185 = function()
{
  var player = GetPlayer();
var pool = player.GetVar("LayerPool").split(",").map(s => s.trim());
var answered = player.GetVar("AnsweredLayers").split(",").map(s => s.trim());

var available = [];
for (var i = 0; i < pool.length; i++) {
  if (answered[i] !== "1") {
    available.push(i+1);
  }
}

if (available.length === 0) {
  player.SetVar("CurrentQuestion", 0); // triggers completion
} else {
  var index = Math.floor(Math.random() * available.length);
  var selected = available[index];
  player.SetVar("CurrentQuestion", selected);
}
}

window.Script186 = function()
{
  var player = GetPlayer();
player.SetVar("TimerActive", true);
player.SetVar("TimerColor", "Normal");
player.SetVar("TimeRemaining", 15); // total seconds
player.SetVar("FormattedTime", "00:15"); // initial display

function countdown() {
  var time = player.GetVar("TimeRemaining");
  var active = player.GetVar("TimerActive");

  if (!active || time < 0) return;

  // Calculate minutes and seconds
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  // Format seconds with leading zero
  var formattedSeconds = seconds < 10 ? "0" + seconds : seconds.toString();
  var formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();

  // Set formatted time string
  player.SetVar("FormattedTime", formattedMinutes + ":" + formattedSeconds);

  // Update countdown
  
  time -= 1;
  player.SetVar("TimeRemaining", time);

  // Trigger color change
  if (time === 5) {
    player.SetVar("TimerColor", "Red");
  }

  // Handle timeout
  if (time < 0) {
    player.SetVar("TimerActive", false);
    player.SetVar("RetryTrigger", true); // triggers TimesUp
  } else {
    setTimeout(countdown, 1000);
  }
}

setTimeout(countdown, 1000);

}

window.Script187 = function()
{
  // Create a canvas for confetti
var canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "9999";
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var confetti = [];
var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];

for (var i = 0; i < 150; i++) {
  confetti.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 100 + 50,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.random() * 10 - 10
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(function(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
    ctx.fillStyle = p.color;
    ctx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confetti.forEach(function(p) {
    p.y += p.d / 100;
    p.x += Math.sin(p.tilt);
    if (p.y > canvas.height) {
      p.y = -10;
      p.x = Math.random() * canvas.width;
    }
  });
}

setInterval(drawConfetti, 20);

// Auto remove after 5 seconds
setTimeout(function() {
  document.body.removeChild(canvas);
}, 7000);

}

window.Script188 = function()
{
  var player = GetPlayer();
var index = player.GetVar("CurrentQuestion"); // this is your question index (1-based)

var flags = player.GetVar("AnsweredLayers").split(",");
flags[index - 1] = "1"; // mark as correct
player.SetVar("AnsweredLayers", flags.join(","));

}

};
