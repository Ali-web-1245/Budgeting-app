const budgetInput = document.getElementById("budget");
const setBudgetBtn = document.getElementById("set-budget");

const expenseNameInput = document.getElementById("name");
const expenseCostInput = document.getElementById("Cost");
const checkAmountBtn = document.getElementById("check");

const totalBudgetCard = document.getElementById("total");
const totalExpensesCard = document.getElementById("Expenses");
const balanceCard = document.getElementById("Balance");
const expenseItemsList = document.getElementById("expense-items");

let total_budget = 0;
let total_expens = 0;

let editmode = false;
let edit_element = null;
let old_cost = 0;

// ---------- Set budget ----------
setBudgetBtn.addEventListener("click", function () {
  let budget = Number(budgetInput.value);

  if (budgetInput.value.trim() === "" || isNaN(budget) || budget < 0) {
    alert("Sahi budget likhein");
    return;
  }

  total_budget = budget;
  totalBudgetCard.textContent = total_budget;
  balanceCard.textContent = total_budget - total_expens;
  budgetInput.value = "";
});

// ---------- Delete ----------
function DeleteElement(button) {
  let item = button.parentElement;
  let cost = Number(item.children[1].textContent);

  // agar yehi item edit ho raha tha to edit mode band karo
  if (item === edit_element) {
    editmode = false;
    edit_element = null;
    old_cost = 0;
    expenseNameInput.value = "";
    expenseCostInput.value = "";
  }

  item.remove();
  total_expens -= cost;

  totalExpensesCard.textContent = total_expens;
  balanceCard.textContent = total_budget - total_expens;
}

// ---------- Edit ----------
function Editexpense(button) {
  let expense_div = button.parentElement;
  let cost = Number(expense_div.children[1].textContent);

  expenseNameInput.value = expense_div.children[0].textContent;
  expenseCostInput.value = cost;

  editmode = true;
  edit_element = expense_div;
  old_cost = cost;
}

// ---------- Add / Update expense ----------
checkAmountBtn.addEventListener("click", function () {
  let Cost = Number(expenseCostInput.value);
  let name = expenseNameInput.value.trim();

  if (name === "" || expenseCostInput.value.trim() === "" || isNaN(Cost) || Cost <= 0) {
    alert("Naam aur sahi amount likhein");
    return;
  }

  if (editmode) {
    edit_element.children[0].textContent = name;
    edit_element.children[1].textContent = Cost;

    total_expens += Cost - old_cost;

    editmode = false;
    edit_element = null;
    old_cost = 0;
  } else {
    total_expens += Cost;

    expenseItemsList.insertAdjacentHTML(
      "beforeend",
      `<div class="expense-items">
        <span></span>
        <span>${Cost}</span>
        <button onclick="DeleteElement(this)">Delete</button>
        <button class="edit-btn" onclick="Editexpense(this)">Edit</button>
      </div>`
    );

    // naam textContent se daalo taake HTML inject na ho sake
    expenseItemsList.lastElementChild.children[0].textContent = name;
  }

  totalExpensesCard.textContent = total_expens;
  balanceCard.textContent = total_budget - total_expens;

  expenseNameInput.value = "";
  expenseCostInput.value = "";
});