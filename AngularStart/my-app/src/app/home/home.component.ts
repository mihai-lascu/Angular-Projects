import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from "./ui/welcome/welcome.component";
import {RandomColorDirective} from "./ui/random-color.directive";
import {ReversePipe} from "./ui/reverse.pipe";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, WelcomeComponent, RandomColorDirective, ReversePipe],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	magic = 'reverse me';
	user = {
		name: 'Mihai'
	};

	handleCookies() {
		console.log('do something');
	}
}
