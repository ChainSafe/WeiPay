class Token {
  constructor(symbol, address) {
    this.symbol = symbol;
    this.address = address;
  }

  logStuff() {
    console.log('Printing Token Data');
    console.log(this);
  }
}

export default Token;
