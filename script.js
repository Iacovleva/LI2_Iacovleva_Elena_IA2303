/**
 * Represents a transaction.
 * @typedef {Object} Transaction
 * @property {number} id - Unique identifier for the transaction.
 * @property {string} date - Date and time of the transaction.
 * @property {number} amount - Amount of the transaction.
 * @property {string} category - Category of the transaction.
 * @property {string} description - Description of the transaction.
 */

/** @type {Transaction[]} */
let transactions = [];

/**
 * Adds a new transaction.
 */
function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    
    const transaction = {
        id: transactions.length + 1,
        date: new Date().toLocaleString(),
        amount,
        category,
        description
    };
    
    transactions.push(transaction);
    
    const table = document.getElementById('transaction-table').getElementsByTagName('tbody')[0];
    const row = table.insertRow();
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;
    
    if (amount > 0) {
        row.style.backgroundColor = 'lightgreen';
    } else {
        row.style.backgroundColor = 'salmon';
    }
    
    calculateTotal();
}

/**
 * Deletes a transaction.
 * @param {number} transactionId - The ID of the transaction to delete.
 */
function deleteTransaction(transactionId) {
    transactions = transactions.filter(transaction => transaction.id !== transactionId);
    const table = document.getElementById('transaction-table');
    const rowIndex = Array.from(table.rows).findIndex(row => row.cells[0].textContent == transactionId);
    table.deleteRow(rowIndex);
    calculateTotal();
}

/**
 * Calculates the total amount of transactions.
 */
function calculateTotal() {
    const total = transactions.reduce((acc, curr) => acc + curr.amount, 0);
    document.getElementById('total').textContent = `Общая сумма: ${total.toFixed(2)}`;
}

/**
 * Displays detailed information about a transaction.
 * @param {number} transactionId - The ID of the transaction.
 */
function showTransactionDetails(transactionId) {
    const transaction = transactions.find(transaction => transaction.id === transactionId);
    document.getElementById('transaction-details').innerHTML = `
        <h3>Полное описание транзакции #${transaction.id}</h3>
        <p>Дата и время: ${transaction.date}</p>
        <p>Сумма: ${transaction.amount}</p>
        <p>Категория: ${transaction.category}</p>
        <p>Описание: ${transaction.description}</p>
    `;
}

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    addTransaction();
});

document.getElementById('transaction-table').addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON') {
        const transactionId = parseInt(event.target.parentNode.parentNode.firstElementChild.textContent);
        deleteTransaction(transactionId);
    } else if (event.target.tagName === 'TD') {
        const transactionId = parseInt(event.target.parentNode.firstElementChild.textContent);
        showTransactionDetails(transactionId);
    }
});

calculateTotal();
