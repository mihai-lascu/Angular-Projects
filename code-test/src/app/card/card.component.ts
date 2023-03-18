import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, interval, map, tap } from 'rxjs';
import { Card, Connection } from '../utils/types';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
	connection$ = new BehaviorSubject<Connection>({
		ready: true,
		message: '',
	});

	connectionJammer$ = interval((Math.random() + 2) * 5000).pipe(
		tap(() => {
			if (this.connection$.value.ready) {
				this.connection$.next({
					ready: false,
					message: 'Connection lost',
				});
			}
		}),
		map(() => 'break connection')
	);

	@Input() card!: Card;
	@Output() deleteCardEvent = new EventEmitter<void>();

	constructor() {}

	ngOnInit(): void {}

	refreshConnection(): void {
		const tryAgain = Math.random() * 10;

		if (tryAgain > 5) {
			this.connection$.next({
				ready: true,
				message: '',
			});
		} else {
			this.connection$.next({
				ready: false,
				message: 'Refresh failed, please try again',
			});
		}
	}
}
