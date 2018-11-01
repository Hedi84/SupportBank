class Transaction {
  constructor(from, to, amount, date, narrative ) {
    this.from = from;
    this.amount = amount;
    this.date = date;
    this.narrative = narrative;
  }
}



exports.Transaction = Transaction;
