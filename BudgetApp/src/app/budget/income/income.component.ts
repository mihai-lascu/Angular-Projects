import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {iIncome} from "./income.model";
import {PercentageService} from "../../percentage.service";

@Component({
  selector: 'income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IncomeComponent implements OnInit {

  @Input()
  private incomesArr: Array<iIncome>;

  constructor(private percentageService: PercentageService) {
  }

  ngOnInit() {
  }

  deleteItem(id: number) {
    let ids, index;

    ids = this.incomesArr.map(current => current.id);

    index = ids.indexOf(id);

    if (index !== -1) {
      this.incomesArr.splice(index, 1)
    }

    this.percentageService.updatePercentages();
  }

}
