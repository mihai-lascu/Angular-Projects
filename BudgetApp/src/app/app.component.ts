import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayMonth() {
    let now, year, month, months;

    now = new Date(); //(year, month, day)

    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    month = now.getMonth();

    year = now.getFullYear();

    return `${months[month]} ${year}`
  }
}
