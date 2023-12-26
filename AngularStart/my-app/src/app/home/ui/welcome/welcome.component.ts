import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
	@Input() name = 'friend';
	@Output() cookiesAccepted = new EventEmitter<boolean>();
}
