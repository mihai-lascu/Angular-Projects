import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-job-actions',
	templateUrl: './job-actions.component.html',
	styleUrls: ['./job-actions.component.scss'],
})
export class JobActionsComponent {
	@Output() action: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}
}
