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
    const rate = exchangeRate.get(key);
    if (rate === undefined) {
      return undefined;
    }
    return money.amount * rate;
  }

  evaluate(currency) {
    const failures = [];
    const total = this.moneys.reduce((sum, money) => {
      const convertMoney = this.convert(money, currency);
      if (convertMoney === undefined) {
        failures.push(`${money.currency}->${currency}`);
        return sum;
      }
      return sum + convertMoney;
    }, 0);
    if (!failures.length) {
      return new Money(total, currency);
    }
    throw new Error(`Missing exchange rate(s): [${failures.join(', ')}]`);
  }
}

module.exports = Portfolio;
