import {Component} from '@angular/core';
import {iBudget} from "./budget/budget.model";
import {BUDGET} from "./budget/budget.data";
import {iIncome} from "./budget/income/income.model";
import {iExpense} from "./budget/expense/expense.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private budget: iBudget;
  private newIncome: iIncome;
  private newExpense: iExpense;

  constructor() {
    this.budget = BUDGET;
    this.newIncome = {};
    this.newExpense = {};
  }

  displayMonth() {
    let now, year, month, months;

    now = new Date();

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = now.getMonth();

    year = now.getFullYear();

    return `${months[month]} ${year}`
  }

  keyPress(event: any, value: string, description: string, type: string) {
    if (event.key === "Enter") {
      this.addItem(value, description, type);
    }
  }

  addItem(value: string, description: string, type: string) {
    if (description !== "" && !isNaN(parseInt(value)) && parseInt(value) > 0) {
      if (type === 'inc') {
        this.addIncome(parseInt(value), description);
      } else {
        this.addExpense(parseInt(value), description);
      }
    }
  }

  addIncome(value: number, description: string) {
    if (this.budget.incomes.length > 0) {
      this.newIncome.id = this.budget.incomes[this.budget.incomes.length - 1].id + 1;
    } else {
      this.newIncome.id = 0;
    }
    this.newIncome.description = description;
    this.newIncome.value = value;

    this.budget.incomes.push(this.newIncome);
    this.newIncome = {};

    this.updatePercentages();
  }

  addExpense(value: number, description: string) {
    if (this.budget.expenses.length > 0) {
      this.newExpense.id = this.budget.expenses[this.budget.expenses.length - 1].id + 1;
    } else {
      this.newExpense.id = 0;
    }
    this.newExpense.description = description;
    this.newExpense.value = value;
    this.newExpense.percentage = -1;

    this.budget.expenses.push(this.newExpense);
    this.newExpense = {};

    this.updatePercentages();
  }

  updatePercentages() {
    let totalInc = 0;
    this.budget.incomes.forEach(current => totalInc += current.value);
    this.budget.expenses.forEach(current => {
      if (totalInc > 0) {
        current.percentage = Math.round((current.value / totalInc) * 100);
      } else {
        current.percentage = -1;
      }
    })
  }
}
