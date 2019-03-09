import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iIncome} from "./income.model";

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IncomeComponent implements OnInit {

  @Input()
  private incomesArr: Array<iIncome>;

  constructor() { }

  ngOnInit() {
  }

}
