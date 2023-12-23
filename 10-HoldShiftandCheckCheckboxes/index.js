let lastChecked;

function handleCheck(e) {
  let shouldCheck = false;

  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      if (checkbox == lastChecked || checkbox == this) {
        shouldCheck = !shouldCheck;
      }
      if (shouldCheck) {
        checkbox.checked = true;
      }
    });
  }
  lastChecked = this;
}
const checkboxes = document.querySelectorAll("input[type=checkbox]");

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);
