const csv = require('csvtojson')
const csvFilePath='./source.csv'
const csvFilePath2='./dodgyTransactions2015.csv'
// const imports = require('./transaction.js')
const importsJson = require('./JsonParse.js')

function assignFile (fileName) {
  if (fileName === "2014") {
    return csvFilePath;
  } else if (fileName === "2015") {
    return csvFilePath2;
  } else if (fileName === "2013") {
    return "2013";
  }
}

function parse (callback, fileName) {
  let path = assignFile(fileName)
  if (path === "2013") {
    importsJson.parseJson(callback);
  } else {
    actualParse(callback, path);
  }
}

function actualParse (callback, fileName){
  csv()
  .fromFile(fileName)
  .then(function(jsonObj){
    var transactions = jsonObj;
    callback(transactions);
  });
}

exports.parse = parse;
