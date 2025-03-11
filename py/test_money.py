import unittest

from money import Money
from portfolio import Portfolio


class TestMoney(unittest.TestCase):
    # 테스트 메소드로 인정되기 위해 메소드 이름은 test로 시작해야 함

    # 10 EUR x 2 = 20 EUR
    def test_multiplication(self):
        ten_euros = Money(10, "EUR")
        twenty_euros = Money(20, "EUR")
        self.assertEqual(ten_euros.times(2), twenty_euros)

    # 4002 KRW / 4 = 1000.5 KRW
    def test_division(self):
        original_money = Money(4002, "KRW")
        actual_money_after_division = Money(1000.5, "KRW")
        self.assertEqual(original_money.divide(4), actual_money_after_division)

    # 5 USD + 10 EUR = 17 USD
    def test_addition(self):
        five_dollars = Money(5, "USD")
        ten_dollars = Money(10, "USD")
        fifteen_dollars = Money(15, "USD")
        portfolio = Portfolio()
        portfolio.add(five_dollars, ten_dollars)
        self.assertEqual(fifteen_dollars, portfolio.evaluate("USD"))


if __name__ == "__main__":
    unittest.main()
