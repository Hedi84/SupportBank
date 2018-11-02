const csv = require('csvtojson')
const csvFilePath='./source.csv'
const csvFilePath2='./dodgyTransactions2015.csv'

const imports = require('./transaction.js')

function assignFile (fileName) {
  if (fileName === "2014") {
    return csvFilePath;
  } else if (fileName === "2013") {
    return csvFilePath2;
  }
}

function parse (callback, fileName) {
  let path = assignFile(fileName);
  csv()
  .fromFile(path)
  .then(function(jsonObj){
    var transactions = jsonObj;
  callback(transactions);
  });
}


exports.parse = parse;
