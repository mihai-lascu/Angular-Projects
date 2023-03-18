import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-printer-actions',
	templateUrl: './printer-actions.component.html',
	styleUrls: ['./printer-actions.component.scss'],
})
export class PrinterActionsComponent {
	@Output() action: EventEmitter<string> = new EventEmitter<string>();
	constructor() {}
}
