import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	public kahnCards = [
		{
			id: 1,
			title: 'Stomatolog Vasile Ion',
			name: 'Vasile Ion',
			reviews: 1,
			rating: 1,
			foa: 'Sanatate',
			profession: 'Dentist',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			address: 'Str. Pestalotii nr 50, Timisoara',
			county: 'Arad',
			phone: '0770 222 333',
		},
		{
			id: 2,
			title: 'Stomatolog Vasile Ion',
			name: 'Vasile Ion',
			reviews: 2,
			rating: 2,
			foa: 'Sanatate',
			profession: 'Dentist',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			address: 'Str. Pestalotii nr 50, Timisoara',
			county: 'Alba',
			phone: '0770 222 333',
		},
		{
			id: 3,
			title: 'Stomatolog Vasile Ion',
			name: 'Vasile Ion',
			reviews: 3,
			rating: 3,
			foa: 'Sanatate',
			profession: 'Dentist',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			address: 'Str. Pestalotii nr 50, Timisoara',
			county: 'Hunedoara',
			phone: '0770 222 333',
		},
		{
			id: 4,
			title: 'Stomatolog Vasile Ion',
			name: 'Vasile Ion',
			reviews: 4,
			rating: 4,
			foa: 'Sanatate',
			profession: 'Dentist',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			address: 'Str. Pestalotii nr 50, Timisoara',
			county: 'Arad',
			phone: '0770 222 333',
		},
		{
			id: 5,
			title: 'Stomatolog Vasile Ion',
			name: 'Vasile Ion',
			reviews: 5,
			rating: 5,
			foa: 'Sanatate',
			profession: 'Dentist',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
			address: 'Str. Pestalotii nr 50, Timisoara',
			county: 'Alba',
			phone: '0770 222 333',
		},
	]
	constructor() {}

	ngOnInit(): void {}

	onSearchEvent(searchValues: any) {
		if (searchValues.foa) {
			this.kahnCards = this.kahnCards.filter((kahnCard) => kahnCard.foa === searchValues.foa)
		}
		if (searchValues.county) {
			this.kahnCards = this.kahnCards.filter((kahnCard) => kahnCard.county === searchValues.county)
		}
		if (searchValues.search) {
			const searchWords = searchValues.search.split(' ')
			const filteredKahnCards: any[] = []
			this.kahnCards.forEach((kahnCard) => {
				searchWords.forEach((word: string) => {
					if (
						kahnCard.title.toLowerCase().includes(word.toLowerCase()) ||
						kahnCard.name.toLowerCase().includes(word.toLowerCase()) ||
						kahnCard.description.toLowerCase().includes(word.toLowerCase())
					) {
						filteredKahnCards.push(kahnCard)
					}
				})
			})
			this.kahnCards = [...new Map(filteredKahnCards.map((v) => [v.id, v])).values()]
		}
	}
}
