import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iExpense} from "./expense.model";

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExpenseComponent implements OnInit {

  @Input()
  private expensesArr: Array<iExpense>;

  constructor() {
  }

  ngOnInit() {
  }

}
