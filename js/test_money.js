const assert = require('node:assert');
const Money = require('./money');
const Portfolio = require('./portfolio');

class MoneyTest {
  testMultiplication() {
    // 10 EUR x 2 = 20 EUR
    const tenEuros = new Money(10, 'EUR');
    const twentyEuros = new Money(20, 'EUR');
    assert.deepStrictEqual(tenEuros.times(2), twentyEuros);
  }

  testDivision() {
    // 4002 KRW / 4 = 1000.5 KRW
    const originalMoney = new Money(4002, 'KRW');
    const actualMoneyAfterDivision = originalMoney.divide(4);
    const expectedMoneyAfterDivision = new Money(1000.5, 'KRW');
    assert.deepStrictEqual(
      actualMoneyAfterDivision,
      expectedMoneyAfterDivision,
    );
  }

  testAddition() {
    // 5 USD + 10 EUR = 17 USD
    const fiveDollars = new Money(5, 'USD');
    const tenDollars = new Money(10, 'USD');
    const fifteenDollars = new Money(15, 'USD');
    const portfolio = new Portfolio();
    portfolio.add(fiveDollars, tenDollars);
    assert.deepStrictEqual(portfolio.evaluate('USD'), fifteenDollars);
  }

  getAllTestMethods() {
    const moneyPrototype = MoneyTest.prototype;
    const allProps = Object.getOwnPropertyNames(moneyPrototype);
    const testMethods = allProps.filter((p) => {
      return typeof moneyPrototype[p] === 'function' && p.startsWith('test');
    });
    return testMethods;
  }

  runAllTests() {
    const testMethods = this.getAllTestMethods();
    for (const m of testMethods) {
      console.log(`Running: ${m}()`);
      const method = Reflect.get(this, m);
      try {
        Reflect.apply(method, this, []);
      } catch (e) {
        if (e instanceof assert.AssertionError) {
          console.log(e);
        } else {
          throw e;
        }
      }
    }
    // testMethods.forEach((m) => {
    //   const method = Reflect.get(this, m);
    //   Reflect.apply(method, this, []);
    // });
  }
}

new MoneyTest().runAllTests();
