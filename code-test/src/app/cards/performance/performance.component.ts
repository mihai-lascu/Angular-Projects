import { Component, Input } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { JobsService } from 'src/app/jobs.service';
import { Job } from 'src/app/utils/types';

@Component({
	selector: 'app-performance',
	templateUrl: './performance.component.html',
	styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent {
	jobs$ = this.jobsService
		.getJobs()
		.pipe(map((jobs) => jobs.filter((job) => job.printer === this.printer)));
	@Input() printer!: string;
	constructor(private jobsService: JobsService) {}
}
