import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Status } from './utils/types';

@Injectable({
	providedIn: 'root',
})
export class StatusService {
	private status$ = new Subject<Status>();

	constructor() {}

	getStatus(): Observable<Status> {
		return this.status$;
	}

	updateStatus(status: Status): void {
		this.status$.next({ ...status, dot: 'green' });
	}

	setStatus(action: string): void {
		this.status$.next({
			action,
			dot: 'orange',
		});
	}
}
