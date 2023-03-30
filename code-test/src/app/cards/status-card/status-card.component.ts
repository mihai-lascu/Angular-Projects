import { Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { JobsService } from 'src/app/jobs.service';
import { Card } from 'src/app/utils/types';

@Component({
	selector: 'app-status-card',
	templateUrl: './status-card.component.html',
	styleUrls: ['./status-card.component.scss'],
})
export class StatusCardComponent {
	jobs$ = this.jobsService
		.getJobs()
		.pipe(
			map((jobs) => jobs.filter((job) => job.printer === this.card.printer))
		);
	@Input() card!: Card;
	constructor(private jobsService: JobsService) {}
}
