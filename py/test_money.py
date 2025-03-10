import unittest


class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return self.amount == other.amount and self.currency == other.currency

    def times(self, multiplier):
        return Money(self.amount * multiplier, self.currency)

    def divide(self, divisor):
        return Money(self.amount / divisor, self.currency) 


class TestMoney(unittest.TestCase):
    # 테스트 메소드로 인정되기 위해 메소드 이름은 test로 시작해야 함

    # 5 USD x 2 = 10 USD
    def test_multiplication_in_dollars(self):
        five_dollars = Money(5, "USD")
        ten_dollars = Money(10, "USD")
        self.assertEqual(five_dollars.times(2), ten_dollars)

    # 10 EUR x 2 = 20 EUR
    def test_multiplication_in_euros(self):
        ten_euros = Money(10, "EUR")
        twenty_euros = Money(20, "EUR")
        self.assertEqual(ten_euros.times(2), twenty_euros)

    # 4002 KRW / 4 = 1000.5 KRW
    def test_division(self):
        original_money = Money(4002, 'KRW')
        actual_money_after_division = Money(1000.5, 'KRW')
        self.assertEqual(original_money.divide(4), actual_money_after_division)

if __name__ == "__main__":
    unittest.main()