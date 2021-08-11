"use strict";

const containers = Array.from(document.querySelectorAll(".money-container"));
const deleteBtn = document.querySelectorAll(".btnDel");
const outputs = document.querySelectorAll(".output");
// const incomings = document.querySelector('.incomings');
// const outgoings = document.querySelector('.outgoings');

// get income elements
const incomeTitle = document.querySelector("#incTitle");
const incomeAmount = document.querySelector("#incAmount");
const submitBtn = document.querySelector("#incSubmit");
const incomeList = document.querySelector(".income-list");
const listItem = document.querySelector(".income-list-item");
const totalIncome = document.querySelector("#totalInc");
const totalIncomeValue = document.querySelector("#incTotal");
const incTitles = [];
const incAmounts = [];

// get expense elements
const expenseTitle = document.querySelector("#expTitle");
const expensePrice = document.querySelector("#expPrice");
const expSubmitBtn = document.querySelector("#expSubmit");
const expenseList = document.querySelector(".expense-list");
const totalOutgoings = document.querySelector("#totalExp");
const totalOutgoingValue = document.querySelector("#expTotal");
const expTitles = [];
const expPrices = [];

// get balance elements
const balance = document.querySelector("#balance");

// get currency elements
const confirmBtn = document.querySelector(".btnConfirm");
const dropdown = document.querySelector("#currencyDropDown");
const currencyContainer = document.querySelector(".currency-list");
let currency = "";

// Confirm currency
confirmBtn.addEventListener("click", function (e) {
  e.preventDefault();
  currency = dropdown.value;

  // hide currency choice
  currencyContainer.classList.add("hidden");

  // show money containers
  containers.forEach((cont) => (cont.style.opacity = 1));
  return currency;
});

const calcBalance = function () {
  const total =
    totalIncome.textContent.slice(1) - totalOutgoings.textContent.slice(1);

  balance.textContent = currency + total;
};

const calcIncome = function () {
  // create html
  incomeHTML();
  // store data
  resolveIncData();
  // calculate total
  calcIncTotal();
  // calculate balance
  calcBalance();
};

const incomeHTML = function () {
  if (incomeTitle.value === "" || incomeAmount.value === "") return;
  const html = `<li class ='income-list-item'>
                      <span class="inc-title">${incomeTitle.value}</span>:
                      <span class="inc-amount">${currency}${incomeAmount.value}</span
                      ><i class="fas fa-trash-alt btnDel"></i>
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
  }, 0);
  console.log(total, currency);
  totalIncome.textContent = currency + total;
};

// Listen for click event and enter key
submitBtn.addEventListener("click", calcIncome);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcIncome() && calcExpenses() && calcBalance();
});

const calcExpenses = function () {
  // Create expense html
  outgoingHTML();
  // Handle data
  resolveExpData();
  // Calculate total
  calcExpTotal();
  // calculate balance
  calcBalance();
};

const outgoingHTML = function () {
  const html = `
    <li class ='expense-list-item'>
        <span class="inc-title">${expenseTitle.value}</span>:
        <span class="inc-amount">${expensePrice.value}</span
        ><i class="fas fa-trash-alt btnDel"></i>
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
  totalOutgoings.textContent = currency + total;
};

expSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  calcExpenses();
});
expSubmitBtn.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") calcExpenses();
});

// Make delete button work on li elements
containers.forEach((container) => {
  container.addEventListener("click", function (e) {
    // if btn doesnt exist return
    if (!e.target.classList.contains("btnDel")) return;

    // get elements
    const elements = Array.from(e.target.parentElement.children);
    const title = elements[0].textContent;
    const value = +elements[1].textContent.slice(1);

    // for incoming container
    if (container.classList.contains("incomings")) {
      // Remove title from array
      incTitles.find((t) => {
        if (t === title) {
          const index = incTitles.indexOf(t);
          incTitles.splice(index, 1);
        }
      });
      // remove value from array
      incAmounts.find((a) => {
        if (a === value) {
          const index = incAmounts.indexOf(a);
          incAmounts.splice(index, 1);
        }
      });

      // recalculate totals
      calcIncTotal();
      calcBalance();

      // remove li element
      e.target.parentElement.remove();
    }

    // for outgoings container
    if (container.classList.contains("outgoings")) {
      // Remove title from array
      expTitles.find((t) => {
        if (t === title) {
          const index = expTitles.indexOf(t);
          expTitles.splice(index, 1);
        }
      });
      // remove value from array
      expPrices.find((a) => {
        if (a === value) {
          const index = expPrices.indexOf(a);
          expPrices.splice(index, 1);
        }
      });

      // recalculate totals
      calcExpTotal();
      calcBalance();

      // remove li element
      e.target.parentElement.remove();
    }
  });
});
