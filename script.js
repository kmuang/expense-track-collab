const form = document.getElementById("expense-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const transactionList = document.getElementById("transaction-list");
const balanceDisplay = document.getElementById("balance");

let transactions = [];

function updateBalance() {
  const total = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  balanceDisplay.textContent = `$${total.toFixed(2)}`;
}

function addTransaction(description, amount) {
  const transaction = {
    id: Date.now(),
    description,
    amount: Number(amount)
  };

  transactions.push(transaction);
  renderTransactions();
  updateBalance();
}

function renderTransactions() {
  transactionList.innerHTML = "";

  transactions.forEach(transaction => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${transaction.description}
      <span>$${transaction.amount.toFixed(2)}</span>
    `;
    transactionList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const description = descriptionInput.value;
  const amount = amountInput.value;

  addTransaction(description, amount);

  descriptionInput.value = "";
  amountInput.value = "";
});
