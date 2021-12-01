import { Component, Input, OnInit } from '@angular/core'

interface Star {
	id: number
	icon: string
	class: string
}

@Component({
	selector: 'star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
	public stars: Star[] = [
		{
			id: 1,
			icon: 'star',
			class: 'star-gray star',
		},
		{
			id: 2,
			icon: 'star',
			class: 'star-gray star',
		},
		{
			id: 3,
			icon: 'star',
			class: 'star-gray star',
		},
		{
			id: 4,
			icon: 'star',
			class: 'star-gray star',
		},
		{
			id: 5,
			icon: 'star',
			class: 'star-gray star',
		},
	]

	@Input() set rating(rating: number) {
		this.selectStar(rating)
	}

	constructor() {}

	ngOnInit(): void {}

	selectStar(value: number): void {
		this.stars.forEach((star) => {
			if (star.id <= value) {
				star.class = 'star-gold star'
			} else {
				star.class = 'star-gray star'
			}
		})
	}
}
