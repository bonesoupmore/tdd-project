const Money = require('./money');

class Portfolio {
  constructor() {
    this.moneys = [];
  }

  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }

  convert(money, currency) {
    const exchangeRate = new Map();
    exchangeRate.set('EUR->USD', 1.2);
    exchangeRate.set('USD->KRW', 1100);

    if (money.currency === currency) {
      return money.amount;
    }
    const key = `${money.currency}->${currency}`;
    return money.amount * exchangeRate.get(key);
  }

  evaluate(currency) {
    const total = this.moneys.reduce((sum, money) => {
      return sum + this.convert(money, currency);
    }, 0);
    return new Money(total, currency);
  }
}

module.exports = Portfolio;
