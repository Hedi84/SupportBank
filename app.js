const imports = require('./csvtojson.js');
const importsMore = require('./interface.js');
const importsJson = require('./JsonParse.js');
const moment = require('moment');
var log4js = require('log4js');
var logger = log4js.getLogger();

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});


// function parseTransactions () {
//  imports.parse(listAll);
// }

function getBalances (year) {
  imports.parse(getNames, year);
}


function getTransactions (array, balances) {
  balances.forEach(function (person) {
    var arrayOfTransactions = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i].From == person.name) {
        arrayOfTransactions.push(moment(array[i].Date).format("MMM Do YY"), array[i].Amount, array[i].Narrative);
      }
      person.transactions = arrayOfTransactions;
    }
  });
  console.log(balances);
}


function getNames (array) {
  var accounts = []
  for (var i = 0; i < array.length; i++) {
    accounts[i] = { name: array[i]["To"], amount: 0 }
  }
  accounts = removeDuplicates(accounts);
  plus = calculateBalance(array, accounts);
  balances = calculateDeductions(array, plus);
  var number = importsMore.pickOption();
  if (number === "1") {
    console.log(balances);
  } else if (number === "2") {
   getTransactions(array, balances);
 } else {
   console.log("whoops, I broke.")
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
  // logger.level = 'debug';
  // logger.debug("Program started");
  var year = importsMore.pickYear();
  getBalances(year);
}

runProgram();
