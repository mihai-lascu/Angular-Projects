import {Component} from '@angular/core';
import {iBudget} from "./budget/budget.model";
import {BUDGET} from "./budget/budget.data";
import {iIncome} from "./budget/income/income.model";
import {iExpense} from "./budget/expense/expense.model";
import {PercentageService} from "./percentage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private budget: iBudget;
  private newIncome: iIncome;
  private newExpense: iExpense;
  private description: string;
  private value: number;
  private type: string;

  constructor(private percentageService: PercentageService) {
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

  keyPress(event: any) {
    if (event.key === "Enter") {
      this.addItem();
    }
  }

  addItem() {
    if (this.description !== "" && !isNaN(this.value) && this.value > 0) {
      if (this.type === 'inc') {
        this.addIncome();
      } else {
        this.addExpense();
      }
    }
  }

  addIncome() {
    if (this.budget.incomes.length > 0) {
      this.newIncome.id = this.budget.incomes[this.budget.incomes.length - 1].id + 1;
    } else {
      this.newIncome.id = 0;
    }
    this.newIncome.description = this.description;
    this.newIncome.value = this.value;

    this.budget.incomes.push(this.newIncome);
    this.percentageService.updatePercentages();
    this.newIncome = {};
  }

  addExpense() {
    if (this.budget.expenses.length > 0) {
      this.newExpense.id = this.budget.expenses[this.budget.expenses.length - 1].id + 1;
    } else {
      this.newExpense.id = 0;
    }
    this.newExpense.description = this.description;
    this.newExpense.value = this.value;
    this.newExpense.percentage = -1;

    this.budget.expenses.push(this.newExpense);
    this.percentageService.updatePercentages();
    this.newExpense = {};
  }
}
