const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const checkButton = document.querySelector(".check");
const uncheckButton = document.querySelector(".uncheck");
const deleteButton = document.querySelector(".delete");

const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  const text = this.querySelector("[name=item]").value;

  const item = {
    text,
    done: false,
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
}

function populateList(items = [], list) {
  list.innerHTML = items
    .map((item, index) => {
      return `<li>
              <input type="checkbox" data-index=${index} id="items${index}" ${
        item.done ? "checked" : ""
      }/>
              <label for="items${index}">${item.text}</label>
              </li>`;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return;

  const index = e.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function checkAll() {
  items.forEach((item) => (item.done = true));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function uncheckAll() {
  items.forEach((item) => (item.done = false));
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

function deleteAll() {
  items.length = 0;
  localStorage.setItem("items", JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
checkButton.addEventListener("click", checkAll);
uncheckButton.addEventListener("click", uncheckAll);
deleteButton.addEventListener("click", deleteAll);

populateList(items, itemsList);
