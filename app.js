const imports = require('./csvtojson.js');
const importsMore = require('./interface.js');

function parseTransactions () {
 imports.parse(listAll);
}

function getBalances (number) {
  imports.parse(getNames, number)
}

function getTransactions (array, balances) {
  balances.forEach(function (person) {
    var arrayOfTransactions = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].From == person.name) {
        arrayOfTransactions.push(array[i].Date, array[i].Amount, array[i].Narrative);
      }
      person.transactions = arrayOfTransactions;
    }
  });
  console.log(balances);
}


function getNames (array, number) {
  var accounts = []
  for (var i = 0; i < array.length; i++) {
    accounts[i] = { name: array[i]["To"], amount: 0 }
  }
  accounts = removeDuplicates(accounts);
  plus = calculateBalance(array, accounts);
  balances = calculateDeductions(array, plus);
  if (number === "1") {
    console.log(balances);
  } else {
   getTransactions(array, balances);
  }
}

function removeDuplicates (array) {
  result = []
  array.forEach(function (a) {
    if (!this[a.name]) {
        this[a.name] = { name: a.name, amount: 0 };
        result.push(this[a.name]);
    }
    this[a.name].amount += a.amount;
  }, Object.create(null));
  return result
}

function calculateBalance (array, accounts) {
  accounts.forEach(function (person) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].To === person.name) {
        person.amount = person.amount + Number(array[i].Amount);
        person.amount = parseFloat(person.amount).toFixed(2);
      }
    }
  });
  return accounts;
}

function calculateDeductions (array, accounts) {
  accounts.forEach(function (person) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].From === person.name) {
        person.amount = person.amount - Number(array[i].Amount);
        person.amount = parseFloat(person.amount).toFixed(2);
      };
    };
  });
  return accounts;
}


function listAll (array) {
  console.log(array)
}


function runProgram () {
  var number = importsMore.pickOption();
  getBalances(number);
}

runProgram();
