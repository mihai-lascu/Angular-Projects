import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from "./ui/welcome/welcome.component";
import {RandomColorDirective} from "./ui/random-color.directive";
import {ReversePipe} from "./ui/reverse.pipe";
import {Router, RouterLink} from "@angular/router";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, WelcomeComponent, RandomColorDirective, ReversePipe, RouterLink],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	magic = 'reverse me';
	user = {
		name: 'Mihai'
	};
	listOfDetails = [
		{id: 1, name: 'Detail nr. 1'},
		{id: 2, name: 'Detail nr. 2'},
		{id: 3, name: 'Detail nr. 3'}
	]

	constructor(private router: Router) {}

	handleLogin() {
		// Do the login and then:
		this.router.navigate(['settings']);
	}

	handleCookies() {
		console.log('do something');
	}
}
