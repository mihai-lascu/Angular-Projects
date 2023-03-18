import { Component } from '@angular/core';
import { delay, merge, tap } from 'rxjs';
import { StatusService } from '../status.service';

@Component({
	selector: 'app-status-bar',
	templateUrl: './status-bar.component.html',
	styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent {
	currentStatus$ = this.statusService.getStatus();
	constructor(private statusService: StatusService) {}
}
