// const url = require('url')
const url = "https://raw.githubusercontent.com/CorndelWithSoftwire/supportbank-js/master/resources/Transactions2013.json";
const got = require('got');


function parseJson (callback) {
  console.log("reached parseJson")
  got(url, { json: true }).then(response => {
    let array = response.body;
    correctArray = renameKeys(array)
    callback(correctArray);
  }).catch(error => {
    console.log(error.response.body);
  });
}


function renameKeys (array) {
  array.forEach(function (object) {
    object.From = object.FromAccount
    delete object.FromAccount
    object.To = object.ToAccount
    delete object.ToAccount
  });
  return array
}



exports.parseJson = parseJson;
