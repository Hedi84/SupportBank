const imports = require('./csvtojson.js');
const importsMore = require('./interface.js');

function parseTransactions () {
 imports.parse(listAll);
}

function getBalances () {
  imports.parse(getNames)
}

function getTransactions () {

}


function getNames (array) {
            console.log(array.length)
  var accounts = []
  for (var i = 0; i < array.length; i++) {
    accounts[i] = { name: array[i]["To"], amount: 0 }
  }
  accounts = removeDuplicates(accounts);
  // console.log(accounts);
  plus = calculateBalance(array, accounts);
  // console.log(plus);
  balances = calculateDeductions(array, plus);
  console.log(balances);
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
      };
    };
  });
  return accounts;
}


function listAll (array) {
  console.log(array)
}


function runProgram () {
  var option = importsMore.pickOption();
  if (option === "1") {
    getBalances();
  }else if (option === "2") {
    getTransactions()
  }
}

runProgram();
