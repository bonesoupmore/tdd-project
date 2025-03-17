import functools
import operator

from money import Money


class Portfolio:
    def __init__(self):
        self.moneys = []

    def add(self, *moneys):
        self.moneys.extend(moneys)

    def evaluate(self, currency):
        total = 0.0
        failures = []
        for m in self.moneys:
            try:
                total += self.__convert(m, currency)
            except KeyError as ke:
                failures.append(ke)

        if len(failures) == 0:
            return Money(total, currency)

        failure_message = ", ".join(f.args[0] for f in failures)
        raise Exception(f"Missing exchange rate(s): [{failure_message}]")

    def __convert(self, a_money, a_currency):
        exchange_rate = {
            "EUR->USD": 1.2,
            "USD->KRW": 1100,
        }
        key = a_money.currency + "->" + a_currency
        if a_money.currency == a_currency:
            return a_money.amount
        else:
            return a_money.amount * exchange_rate[key]
