import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from './utils/types';

@Injectable({
	providedIn: 'root',
})
export class CardsService {
	private cards$ = new BehaviorSubject<Card[]>([]);

	constructor() {}

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
