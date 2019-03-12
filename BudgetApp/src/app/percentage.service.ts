import {Injectable} from '@angular/core';
import {iBudget} from "./budget/budget.model";
import {BUDGET} from "./budget/budget.data";

@Injectable({
  providedIn: 'root'
})
export class PercentageService {
  private budget: iBudget;

  constructor() {
    this.budget = BUDGET;
  }

  updatePercentages() {
    let totalInc = 0;
    this.budget.incomes.forEach(current => totalInc += current.value);
    this.budget.expenses.forEach(current => {
      if (totalInc > 0) {
        current.percentage = Math.round((current.value / totalInc) * 100);
      } else {
        current.percentage = 1;
      }
    });
  }
}
