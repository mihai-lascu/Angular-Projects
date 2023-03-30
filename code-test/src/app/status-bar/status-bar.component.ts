import { Component } from '@angular/core';
import { debounceTime, filter, tap } from 'rxjs';
import { StatusService } from '../status.service';

@Component({
	selector: 'app-status-bar',
	templateUrl: './status-bar.component.html',
	styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent {
	currentStatus$ = this.statusService.getStatus();
	updateStatus$ = this.statusService.getStatus().pipe(
		filter((status) => status.dot !== 'green'),
		debounceTime(5000),
		tap((status) => this.statusService.updateStatus(status))
	);
	constructor(private statusService: StatusService) {}
}
