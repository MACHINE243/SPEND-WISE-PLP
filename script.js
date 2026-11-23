
let budget = 0;

// Array stores multiple expense records
let expenses = [];

// Select HTML elements
const budgetInput = document.getElementById("budgetInput");
const setBudgetBtn = document.getElementById("setBudgetBtn");
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const budgetDisplay = document.getElementById("budgetDisplay");
const spentDisplay = document.getElementById("spentDisplay");
const remainingDisplay = document.getElementById("remainingDisplay");
const budgetMessage = document.getElementById("budgetMessage");
const expenseList = document.getElementById("expenseList");

// Format money in Kenyan Shillings
function formatMoney(amount) {
    return "KSh " + amount.toLocaleString("en-KE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Set budget using an event listener
setBudgetBtn.addEventListener("click", function () {
    const newBudget = Number(budgetInput.value);

    // Decision making
    if (newBudget <= 0 || !Number.isFinite(newBudget)) {
        alert("Please enter a valid budget.");
        return;
    }

    budget = newBudget;
    budgetDisplay.textContent = formatMoney(budget);

    updateDashboard();
});

// Add new expense using form submission
expenseForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Validate expense
    if (name === "" || amount <= 0 || !Number.isFinite(amount) || category === "") {
        alert("Please enter valid expense details.");
        return;
    }

    // Store expense as an object inside the array
    const newExpense = {
        name: name,
        amount: amount,
        category: category,
        date: new Date().toLocaleDateString()
    };

    expenses.push(newExpense);

    // Clear form after adding
    expenseForm.reset();

    // Update webpage
    updateDashboard();
});

// Calculate total expenses using a loop
function calculateTotal() {
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    return total;
}

// Update dashboard dynamically
function updateDashboard() {
    const totalSpent = calculateTotal();
    const remaining = budget - totalSpent;

    spentDisplay.textContent = formatMoney(totalSpent);
    remainingDisplay.textContent = formatMoney(remaining);

    // Decision making based on budget
    if (budget === 0) {
        budgetMessage.textContent = "Please set your budget first.";
    } 
    else if (totalSpent > budget) {
        budgetMessage.textContent = "Warning! You have exceeded your budget.";
    } 
    else if (totalSpent === budget) {
        budgetMessage.textContent = "You have reached your budget limit.";
    } 
    else if (totalSpent >= budget * 0.8) {
        budgetMessage.textContent = "Careful! You have used 80% of your budget.";
    } 
    else {
        budgetMessage.textContent = "Great! You are managing your budget well.";
    }

    displayExpenses();
}

// Display expenses on the webpage
function displayExpenses() {
    expenseList.textContent = "";

    // Loop through all expense records
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];

        const li = document.createElement("li");
        const details = document.createElement("span");
        const deleteButton = document.createElement("button");

        details.textContent =
            expense.name + " - " + expense.category +
            " - " + formatMoney(expense.amount) +
            " (" + expense.date + ")";

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        // Event listener for deleting an expense
        deleteButton.addEventListener("click", function () {
            expenses.splice(i, 1);
            updateDashboard();
        });

        li.appendChild(details);
        li.appendChild(deleteButton);
        expenseList.appendChild(li);
    }
}

// Initialize dashboard
updateDashboard();
