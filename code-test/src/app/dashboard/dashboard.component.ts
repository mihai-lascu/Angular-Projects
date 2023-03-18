import { Component } from '@angular/core';
import { CardsService } from '../cards.service';
import { JobsService } from '../jobs.service';
import { StatusService } from '../status.service';
import { Card } from '../utils/types';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
	cards$ = this.cardsService.getCards();
	constructor(
		private cardsService: CardsService,
		private statusService: StatusService,
		private jobsService: JobsService
	) {}

	removeCard(index: number): void {
		this.cardsService.removeCard(index);
	}

	onCardAction(action: string, card: Card): void {
		this.statusService.setStatus(action);

		this.jobsService.addJob({
			printer: card.printer,
			action,
			result: 'Success',
		});
	}
}
