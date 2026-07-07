const balance = document.getElementById("balance");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {
    list.innerHTML = "";
    let total = 0;

    transactions.forEach((transaction, index) => {
        total += Number(transaction.amount);

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${transaction.text}</span>
            <span>₹${transaction.amount}</span>
            <button class="delete" onclick="deleteTransaction(${index})">Delete</button>
        `;
        list.appendChild(li);
    });

    balance.innerText = `₹${total.toFixed(2)}`;
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransaction() {
    if (text.value.trim() === "" || amount.value === "") {
        alert("Please enter description and amount");
        return;
    }

    transactions.push({
        text: text.value,
        amount: Number(amount.value)
    });

    text.value = "";
    amount.value = "";

    updateUI();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

updateUI();
