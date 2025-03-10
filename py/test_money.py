import unittest


class Dollar:
    def __init__(self, amount):
        self.amount = amount

    def times(self, multiplier):
        return Dollar(self.amount * multiplier)

class TestMoney(unittest.TestCase):
    # 테스트 메소드로 인정되기 위해 메소드 이름은 test로 시작해야 함
    def test_multiplication(self):
        fiver = Dollar(5)
        tenner = fiver.times(2)
        self.assertEqual(10, tenner.amount)

if __name__ == "__main__":
    unittest.main()