const goal = 1000000;
const goal2 = 100000;
const goal3 = 10000;
const goal4 = 1000;

const setInterest = 1.015;

let history = JSON.parse(localStorage.getItem("walletHistory")) || [];

function updateDisplay() {
  const list = document.getElementById("historyList");

  list.innerHTML = "";

  history.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}: €${entry.value.toFixed(2)}`;
    list.appendChild(li);
  });

  if (history.length < 2) return;

  let interests = [];
  for (let i = 1; i < history.length; i++) {
    const today = history[i].value;
    const yesterday = history[i - 1].value;
    const rate = (today / yesterday - 1) * 100;

    interests.push(rate);
  }

  const last = interests[interests.length - 1];
  const avg = interests.reduce((a, b) => a + b, 0) / interests.length;

  document.getElementById(
    "lastInterest"
  ).textContent = `📈 Today's Interest: ${last.toFixed(2)}%`;
  document.getElementById(
    "avgInterest"
  ).textContent = `📊 Average Daily Interest: ${avg.toFixed(2)}%`;

  // Project days to goal
  function daysToReach(start, target, avg) {
    let current = start;
    let days = 0;
    while (current < target && avg > 0 && days < 10000) {
      current *= 1 + setInterest / 100;
      days++;
    }
    return days;
  }

  let base = history[history.length - 1].value;
  let days = daysToReach(base, goal, setInterest);
  let day2 = daysToReach(base, goal2, setInterest);
  let day3 = daysToReach(base, goal3, setInterest);
  let day4 = daysToReach(base, goal4, setInterest);

  document.getElementById(
    "daysToGoal"
  ).textContent = `🎯 Estimated Days to Reach ${goal} €: ${days}`;

  document.getElementById(
    "daysToGoal2"
  ).textContent = `🎯 Estimated Days to Reach ${goal2} €: ${day2}`;

  document.getElementById(
    "daysToGoal3"
  ).textContent = `🎯 Estimated Days to Reach ${goal3} €: ${day3}`;

  document.getElementById(
    "daysToGoal4"
  ).textContent = `🎯 Estimated Days to Reach ${goal4} €: ${day4}`;
}

function submitValue() {
  const input = document.getElementById("walletInput");
  const val = parseFloat(input.value);

  if (isNaN(val) || val <= 0) return alert("Please enter a valid number.");
  history.push({
    value: val,
    date: new Date().toISOString().split("T")[0],
  });

  localStorage.setItem("walletHistory", JSON.stringify(history));
  input.value = "";

  updateDisplay();
}

function clearHistory() {
  if (confirm("Are you sure you want to delete all history?")) {
    localStorage.removeItem("walletHistory");
    history = [];
    updateDisplay();
  }
}

// checks if one day has passed.
function hasOneDayPassed() {
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above:
  // inferring a day has yet to pass since both dates are equal.
  if (localStorage.yourapp_date == date) return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}

// some function which should run once a day
function runOncePerDay() {
  if (!hasOneDayPassed()) return false;

  // your code below
}

runOncePerDay(); // run the code

updateDisplay();

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(
    Draggable,
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    CustomEase,
    CustomBounce
  );
  // gsap code here!
});
