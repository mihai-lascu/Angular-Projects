import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iBudget} from "./budget.model";

@Component({
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BudgetComponent implements OnInit {

  @Input()
  private budget: iBudget;

  getTotalExp() {
    let expTotal = 0;

    this.budget.expenses.forEach(current => expTotal += current.value);
    return expTotal;
  }

  getTotalInc() {
    let incTotal = 0;
    this.budget.incomes.forEach(current => incTotal += current.value);

    return incTotal;
  }

  getBudget() {
    this.budget.budget = this.getTotalInc() - this.getTotalExp();
    return this.budget.budget;
  }

  getPercentage() {
    if (this.getTotalInc() > 0) {
      this.budget.percentage = Math.round((this.getTotalExp() / this.getTotalInc()) * 100);
      return this.budget.percentage
    } else {
      return this.budget.percentage = -1;
    }
  }

  ngOnInit() {

  }

}
