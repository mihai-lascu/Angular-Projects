import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from 'src/app/utils/types';

@Component({
	selector: 'app-action-card',
	templateUrl: './action-card.component.html',
	styleUrls: ['./action-card.component.scss'],
})
export class ActionCardComponent {
	@Input() card!: Card;
	@Output() action: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}
}
