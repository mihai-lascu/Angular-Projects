import { Component, Input, OnInit } from '@angular/core'

@Component({
	selector: 'kahn-card',
	templateUrl: './kahn-card.component.html',
	styleUrls: ['./kahn-card.component.css'],
})
export class KahnCardComponent implements OnInit {
	@Input() kahnCard: any
	constructor() {}

	ngOnInit(): void {}
}
