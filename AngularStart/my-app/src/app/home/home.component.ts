import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from "./ui/welcome/welcome.component";

@Component({
  selector: 'app-home',
  standalone: true,
	imports: [CommonModule, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
