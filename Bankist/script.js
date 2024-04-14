'use strict';
import accounts from "./accountsData.js";

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//global variables
let timerInterval;
let loggedInUser;

//functions
const getGreeting = function() {
  const date = new Date();
  const hours = date.getHours();
  if(hours >= 18) return "Good Evening"
  else if(hours >= 12) return "Good Afternoon"
  else if(hours >= 6) return "Good Morning"
  else return "Welcome"
}

const displayWelcomeMsg = function (owner) {
  const greeting = getGreeting();
  labelWelcome.textContent = `${greeting}, ${owner}!`;
};

const getDateAndTime = function (locale) {
  const date = new Date();
  const currentDate = new Intl.DateTimeFormat(locale).format(new Date())
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${currentDate}, ${hours}:${minutes}`;
};

const formatCurrency = function(locale, currency, value) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value)
}

const formatMovementDate = function (movDate, locale) {
  const currentDate = new Date()
  const movementDate = new Date(movDate)
  const days = Math.round((currentDate - movementDate)/(1000 * 60 * 60 * 24))

  if(days === 0) return "Today";
  else if(days === 1) return "Yesterday";
  else if(days > 1 && days <= 9) return `${days} days ago`
  else return new Intl.DateTimeFormat(locale).format(new Date(movementDate))
};

const addMovements = function (account) {
  containerMovements.innerHTML = '';
  account.movements.forEach((mov, i) => {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const displayDate = formatMovementDate(account.movementsDates[i], account.locale)
    const movRowHtml = `<div class="movements__row">
      <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formatCurrency(account.locale, account.currency, mov.toFixed(2))}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movRowHtml);
  });
};

const displaySummary = function (account) {
  const incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((allIncomes, income) => allIncomes + income, 0)
  const out = account.movements
    .filter(movement => movement < 0)
    .reduce((allOuts, out) => allOuts + out, 0)
  const interest = account.movements
    .filter(movement => movement > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .reduce((allInterests, interest) => allInterests + interest, 0)

  labelSumIn.textContent = formatCurrency(account.locale, account.currency, incomes.toFixed(2))
  labelSumOut.textContent = formatCurrency(account.locale, account.currency, Math.abs(out).toFixed(2))
  labelSumInterest.textContent = formatCurrency(account.locale, account.currency, interest.toFixed(2))
};

const updateUI = function (account) {
  containerApp.style.opacity = 1;
  labelDate.textContent = getDateAndTime(account.locale);
  account.balance = account.movements
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);
  labelBalance.textContent = formatCurrency(account.locale, account.currency, account.balance)

  //add movements
  addMovements(account);

  //display summary
  displaySummary(loggedInUser);
};

//Removes entire page except the login
const resetLogin = function () {
  labelWelcome.textContent = 'Log in to get started';
  containerApp.style.opacity = 0;
};

const updateTimer = function (timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  labelTimer.textContent = `${minutes}:${seconds}`;
};

const addLogoutTimer = function () {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  let timeInSeconds = 600;
  updateTimer(timeInSeconds);
  timerInterval = setInterval(function () {
    if (timeInSeconds === 0) {
      resetLogin();
      containerApp.style.opacity = 0; //Hide UI
      clearInterval(timerInterval);
    } else {
      updateTimer(timeInSeconds);
    }

    timeInSeconds--;

  }, 1000);
};

//Event handlers
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  loggedInUser = accounts.find(
    acc =>
      acc.username === inputLoginUsername.value &&
      acc.pin === Number(inputLoginPin.value)
  );

  if (loggedInUser) {
    addLogoutTimer();
    displayWelcomeMsg(loggedInUser.owner.split(' ')[0]);

    //emptying the login fields and remove focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur(), inputLoginPin.blur();

    updateUI(loggedInUser);
  } else {
    console.log("The user with the given credentials doesn't exist!");
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const transferAmount = Math.floor(inputTransferAmount.value);
  if (
    transferTo &&
    transferAmount > 0 &&
    loggedInUser.balance >= transferAmount
  ) {
    const recipientAccount = accounts.find(
      account =>
        account.username === transferTo && transferTo !== loggedInUser.username
    );
    if (recipientAccount) {
      //Adding negative movement to current user
      loggedInUser.movements.push(-transferAmount);
      loggedInUser.movementsDates.push(new Date().toISOString())

      //Adding positive movement to recipient
      recipientAccount.movements.push(transferAmount);
      recipientAccount.movementsDates.push(new Date().toISOString())

      addLogoutTimer();
      updateUI(loggedInUser);
      inputTransferTo.value = inputTransferAmount.value = '';
      inputTransferTo.blur(), inputTransferAmount.blur();
    } else {
      console.log("The user doesn't exist or you can't transfer to yourself");
    }
  } else {
    console.log(
      'Invalid transfer credentials or transfer amount is greater than the bank balance!'
    );
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  //Atleast one deposit should be equal to the 10% of loan requested
  const loan = Math.floor(inputLoanAmount.value);
  const loanGranted = loggedInUser.movements.some(mov => mov >= loan / 10);
  if (loan > 0 && loanGranted) {
    loggedInUser.movements.push(loan);
    loggedInUser.movementsDates.push(new Date().toISOString())
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
    addLogoutTimer();
    updateUI(loggedInUser);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    loggedInUser.username === inputCloseUsername.value &&
    loggedInUser.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      account =>
        account.username === loggedInUser.username &&
        account.pin === loggedInUser.pin
    );
    accounts.splice(index, 1);
    inputClosePin.value = inputCloseUsername.value = '';
    resetLogin();
  }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  const sortedMovements = {
    ...loggedInUser,
    movements: [...loggedInUser.movements],
  };
  sortedMovements.movements.sort((a, b) => a - b);
  if (sorted) {
    addMovements(loggedInUser);
  } else {
    addMovements(sortedMovements);
  }
  sorted = !sorted
});
