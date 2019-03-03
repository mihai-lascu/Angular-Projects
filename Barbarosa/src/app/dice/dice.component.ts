import {Component, Input, OnInit} from '@angular/core';
import {IDice} from "./dice.model";
import {DICE} from "./dice.data";

@Component({
  selector: 'dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  private diceArr: Array<IDice>;

  @Input()
  private init: boolean;

  constructor() {
    this.diceArr = DICE;
  }

  public roll() {
    this.diceArr.forEach(current => {
      if (current.disabled === true) {
        current.value = 0;
      } else {
        current.value = Math.floor(Math.random() * 6) + 1;
        current.image = `assets/images/dice-${current.value}.png`;
      }
    })
  }

  ngOnInit() {
  }

}
