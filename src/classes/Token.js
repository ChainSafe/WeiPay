


class Token {
  constructor(symbol, name, imageUrl, tokenQuantity, tokenBalances) {
    this.symbol = symbol;
    this.name = name;
    this.imageUrl = imageUrl;
    this.tokenQuantity = tokenQuantity;
    this.tokenBalances = tokenBalances;
  }

  logStuff() {
    console.log(this.symbol);
    console.log(this.name);
    console.log(this.imageUrl);
    console.log(this.tokenQuantity);
    console.log(this.tokenBalances);
  }
}

const createToken = (sym, name, url, quantity, balances) => {
  const token = new Token(sym, name, url, quantity, balances);
  console.log('Created a token OBJ');
  console.log(token.logStuff());
  return token;
};

export default createToken;