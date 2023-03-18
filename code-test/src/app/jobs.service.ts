import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job } from './utils/types';

@Injectable({
	providedIn: 'root',
})
export class JobsService {
	private jobs$ = new BehaviorSubject<Job[]>([]);

	constructor() {}

	getJobs(): Observable<Job[]> {
		return this.jobs$;
	}

	addJob(job: Job): void {
		this.jobs$.next([...this.jobs$.value, job]);
	}
}
