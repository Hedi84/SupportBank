const csv = require('csvtojson')
const csvFilePath='./source.csv'
const imports = require('./transaction.js')

function parse (callback) {
  csv()
  .fromFile(csvFilePath)
  .then(function(jsonObj){
    const transactions = jsonObj
  callback(transactions)
  })

}

exports.parse = parse;
