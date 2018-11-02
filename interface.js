const readline = require('readline-sync');
const imports = require('./transaction.js')

function pickOption () {
  var number = ""
  console.log("Pick an option:");
  console.log("1) see balances");
  console.log("2) see transactions");
  number = readline.prompt();
  if (number === "1" || number === "2") {
    return number
  } else {
    console.log("That is not a valid option");
    }
}

function pickYear () {
  var year = "";
  console.log("What year? Enter 2013, 2014 or 2015");
  year = readline.prompt();
  if (year === "2015" || year === "2014" || year === "2013") {
    return year
  } else {
    console.log("That's not a valid year")
  }
}

exports.pickOption = pickOption;
exports.pickYear = pickYear
