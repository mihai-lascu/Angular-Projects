import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { KahnFilterService } from './kahn-filter.service'
import { BehaviorSubject } from 'rxjs'

export interface County {
	auto: string
	name: string
}

@Component({
	selector: 'kahn-filter',
	templateUrl: './kahn-filter.component.html',
	styleUrls: ['./kahn-filter.component.css'],
})
export class KahnFilterComponent implements OnInit {
	filterForm: FormGroup
	counties$: BehaviorSubject<County[]> = new BehaviorSubject<County[]>([])

	foaOptions = ['Sanatate', 'IT', 'Agricultura']

	@Output() searchEvent: EventEmitter<any> = new EventEmitter<any>()

	constructor(private kahnFilterService: KahnFilterService, private fb: FormBuilder) {}

	ngOnInit(): void {
		this.filterForm = this.fb.group({
			county: [''],
			foa: [''],
			search: [''],
		})
		this.kahnFilterService.getCounties().subscribe((counties) => this.counties$.next(counties))
	}

	onSearchClick() {
		this.searchEvent.emit(this.filterForm.value)
	}
}
