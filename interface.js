const readline = require('readline-sync');

function pickOption () {
  var number = 0
  console.log("Pick an option:");
  console.log("1) see balances");
  console.log("2) see transactions");
  number = readline.prompt();
  if (number == "1" || number == "2") {
    return number
  } else {
    console.log("That is not a valid option");
  }
}

exports.pickOption = pickOption;
