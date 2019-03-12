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

  deleteItem(id: number) {
    let ids, index;

    ids = this.expensesArr.map(current => current.id);

    index = ids.indexOf(id);

    if (index !== -1) {
      this.expensesArr.splice(index, 1)
    }
  }

  ngOnInit() {
  }

}
