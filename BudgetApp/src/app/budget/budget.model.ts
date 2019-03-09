import {iIncome} from "./income/income.model";
import {iExpense} from "./expense/expense.model";

export interface iBudget {
  incomes: Array<iIncome>;
  expenses: Array<iExpense>;
  budget: number;
  percentage: number;
}
