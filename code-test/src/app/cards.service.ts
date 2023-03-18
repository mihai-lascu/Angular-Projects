import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card, CARD_TYPES } from './utils/types';

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	private cards$ = new BehaviorSubject<Card[]>([]);

	constructor() {
		if (environment.testing) {
			const getType = (index: number): CARD_TYPES => {
				switch (index) {
					case 1:
						return CARD_TYPES.JobActions;
					case 2:
						return CARD_TYPES.Performance;
					case 3:
						return CARD_TYPES.PrinterActions;
					default:
						return CARD_TYPES.StatusReport;
				}
			};

			this.cards$.next(
				Array.from(Array(200)).map((_, index) => ({
					printer: 'Printer ' + index,
					type: getType(index % 4),
				}))
			);
		}
	}

	getCards(): Observable<Card[]> {
		return this.cards$;
	}

	addCards(cards: Card[]): void {
		this.cards$.next([...this.cards$.value, ...cards]);
	}

	removeCard(index: number): void {
		this.cards$.next([
			...this.cards$.value.filter((_, cardIndex) => cardIndex != index),
		]);
	}
}
