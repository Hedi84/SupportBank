var csv = require('csv');
var obj = csv();


  function member(Fone, Ftwo, Fthree, Ffour, Ffive) {
    this.Date = Fone;
    this.From = Ftwo;
    this.To = Fthree;
    this.Narrative = Ffour;
    this.Amount = Ffive;
  };

function parser() {

  let MyData = []
  MyData.push(obj.from.path('./source.csv').to.array(function (data) {
    for (var index = 0; index < data.length; index++) {
      new member(data[index][0], data[index][1], data[index][2], data[index][3], data[index][3], data[index][4]);
    }
    // return MyData;
  }));
  return MyData;
}

function listAll(array) {
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    console.log(array[i].From)
  }
}

// a parser gets the table from https://raw.githubusercontent.com/CorndelWithSoftwire/supportbank-js/master/resources/Transactions2014.csv
// class account creates an account for each user
// create a userinterface that takes input from console

function readData() {
  array = parser();
  listAll(array);
}

readData()
