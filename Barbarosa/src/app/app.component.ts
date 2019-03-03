import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private init: boolean;

  constructor() {
    this.init = false;
  }

  public startNewGame() {
    this.init = true;
  }
}
