let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function padTime(time) {
  if (time < 0) {
    return "";
  }
  return `${time < 10 ? "0" : ""}${time}`;
}

function displayTimeLeft(seconds) {
  const hour = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const display = `${hour > 0 ? `${padTime(hour)}:` : ""}${padTime(
    minutes
  )}:${padTime(seconds)}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `Be back at ${hour > 12 ? hour - 12 : hour}:${padTime(
    minutes
  )}`;
}

function handleFormSubmit(e) {
  e.preventDefault();
  let seconds = parseInt(this.minutes.value * 60);
  if (Number.isNaN(seconds) || seconds < 0) {
    seconds = 0;
  }
  timer(seconds);
  this.reset();
}

buttons.forEach((button) =>
  button.addEventListener("click", () => timer(parseInt(button.dataset.time)))
);

document.customForm.addEventListener("submit", handleFormSubmit);
