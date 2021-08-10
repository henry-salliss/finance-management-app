const incomeTitle = document.querySelector("#incTitle");
const incomeAmount = document.querySelector("#incAmount");
const submitBtn = document.querySelector("#incSubmit");
const incomeList = document.querySelector(".income-list");
const listItem = document.querySelector(".income-list-item");
const totalIncome = document.querySelector("#totalInc");
const incTitles = [];
const incAmounts = [];

const calcIncome = function () {
  // create html
  incomeHTML();
  // store data
  resolveIncData();
  // calculate total
  calcIncTotal();
};

const incomeHTML = function () {
  if (incomeTitle.value === "" || incomeAmount.value === "") return;
  const html = `<li class ='income-list-item'>
                      <span class="inc-title">${incomeTitle.value}</span>:
                      <span class="inc-amount">${incomeAmount.value}</span
                      ><i class="fas fa-trash-alt"></i>
                  </li>`;
  incomeList.insertAdjacentHTML("beforeend", html);
};

const resolveIncData = function () {
  // push values to arrays
  incTitles.push(incomeTitle.value);
  incAmounts.push(+incomeAmount.value);
  // Clear input fields
  incomeTitle.value = "";
  incomeAmount.value = "";
};

const calcIncTotal = function () {
  const total = incAmounts.reduce((acc, price) => {
    return acc + price;
  });

  totalIncome.textContent = `$${total}`;
};

// Listen for click event and enter key
submitBtn.addEventListener("click", calcIncome);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcIncome() && calcExpenses();
});

// get expense elements
const expenseTitle = document.querySelector("#expTitle");
const expensePrice = document.querySelector("#expPrice");
const expSubmitBtn = document.querySelector("#expSubmit");
const expenseList = document.querySelector(".expense-list");
const totalOutgoings = document.querySelector("#totalExp");
const expTitles = [];
const expPrices = [];

const calcExpenses = function () {
  // Create expense html
  outgoingHTML();
  // Handle data
  resolveExpData();
  // Calculate total
  calcExpTotal();
};

const outgoingHTML = function () {
  const html = `
    <li class ='expense-list-item'>
        <span class="inc-title">${expenseTitle.value}</span>:
        <span class="inc-amount">${expensePrice.value}</span
        ><i class="fas fa-trash-alt"></i>
    </li>
    `;

  expenseList.insertAdjacentHTML("beforeend", html);
};

const resolveExpData = function () {
  // Store data in arrays
  expTitles.push(expenseTitle.value);
  expPrices.push(+expensePrice.value);

  // Clear inputs
  expenseTitle.value = "";
  expensePrice.value = "";
};

const calcExpTotal = function () {
  const total = expPrices.reduce((acc, price) => {
    return acc + price;
  });
  totalOutgoings.textContent = `$${total}`;
};

expSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  calcExpenses();
});
expSubmitBtn.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") calcExpenses();
});
