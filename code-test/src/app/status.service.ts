import { Injectable } from '@angular/core';
import { debounceTime, filter, Observable, Subject } from 'rxjs';
import { Status } from './utils/types';

@Injectable({
	providedIn: 'root',
})
export class StatusService {
	private status$ = new Subject<Status>();

	constructor() {
		this.status$
			.pipe(
				filter((status) => status.dot !== 'green'),
				debounceTime(5000)
			)
			.subscribe((status) =>
				this.status$.next({
					action: status.action,
					dot: 'green',
				})
			);
	}

	getStatus(): Observable<Status> {
		return this.status$;
	}

	setStatus(action: string): void {
		this.status$.next({
			action,
			dot: 'orange',
		});
	}
}
