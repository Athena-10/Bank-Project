const balanceDisplay = document.getElementById('balance');
const depositeDisplay = document.getElementById('total-deposits');
const withdrawDisplay = document.getElementById('total-withdrawals');
const userInput = document.getElementById('amount');
const statusMessage = document.getElementById('message');


const btnDeposite = document.getElementById('btn-depo');
const btnWithdraw = document.getElementById('btn-withdraw');
const btnReset = document.getElementById('btn-reset');

const initialBalance = 1000;
let currentBalance = initialBalance;
let totalDeposite = 0;
let totalWithdraw = 0;

function refreshUI() {
    balanceDisplay.textContent = "$"+currentBalance;
    depositeDisplay.textContent = "$" + totalDeposite;
    withdrawDisplay.textContent = "$" + totalWithdraw;
}

function updateStatus(message, isError = false) {
    statusMessage.textContent = message;
    statusMessage.style.color = isError ? 'red' : 'green';
}

if(isError) {
    statusMessage.classList.add('error');
} else {
    statusMessage.classList.remove('error');
}

function parseInput() {
    const value = (userInput.value);
    const numberValue = parseFloat(value);
    if (isNaN(numberValue) || numberValue <= 0) {
        updateStatus('Please enter a valid positive number.', true);
        return null;
    }
    return numberValue;
}

function doDeposite() {
    const amount = parseInput();
    if (amount === null) { 
        return;
     }
        currentBalance += amount;
        totalDeposite += amount;
        refreshUI();
        updateStatus(`Deposited $${amount} successfully.`);
    userInput.value = '';
}

function doWithdraw() {
    const amount = parseInput();
    if (amount === null) { 
        return;
     }
    if (amount > currentBalance) {
        updateStatus('Insufficient funds for this withdrawal.', true);
        return;
    }
    currentBalance -= amount;
    totalWithdraw += amount;
    refreshUI();
    updateStatus(`Withdrew $${amount} successfully.`);
    userInput.value = '';
}

function resetEverything() {
    currentBalance = initialBalance;
    totalDeposite = 0;
    totalWithdraw = 0;
    refreshUI();
    updateStatus('Account reset successfully.');
    userInput.value = '';
}

btnDeposite.addEventListener('click', doDeposite);
btnWithdraw.addEventListener('click', doWithdraw);
btnReset.addEventListener('click', resetEverything);

refreshUI();