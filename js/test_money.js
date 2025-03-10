const assert = require("node:assert");

class Money {
	constructor(amount, currency) {
		this.amount = amount;
		this.currency = currency;
	}

	times(multiplier) {
		return new Money(this.amount * multiplier, this.currency);
	}

	divide(divisor) {
		return new Money(this.amount / divisor, this.currency);
	}
}

class Portfolio {
	constructor() {
		this.moneys = [];
	}

	add(...moneys) {
		this.moneys = this.moneys.concat(moneys);
	}

	evaluate(currency) {
		const total = this.moneys.reduce((sum, money) => {
			return sum + money.amount;
		}, 0);
		return new Money(total, currency);
	}
}

// 5 USD x 2 = 10 USD
const fiveDollars = new Money(5, "USD");
const tenDollars = new Money(10, "USD");
assert.deepStrictEqual(fiveDollars.times(2), tenDollars);

// 10 EUR x 2 = 20 EUR
const tenEuros = new Money(10, "EUR");
const twentyEuros = new Money(20, "EUR");
assert.deepStrictEqual(tenEuros.times(2), twentyEuros);

// 4002 KRW / 4 = 1000.5 KRW
const originalMoney = new Money(4002, "KRW");
const actualMoneyAfterDivision = originalMoney.divide(4);
const expectedMoneyAfterDivision = new Money(1000.5, "KRW");
assert.deepStrictEqual(actualMoneyAfterDivision, expectedMoneyAfterDivision);

// 5 USD + 10 EUR = 17 USD
const fifteenDollars = new Money(15, "USD");
const portfolio = new Portfolio();
portfolio.add(fiveDollars, tenDollars);
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
