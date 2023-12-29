import {Component, Signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {toSignal} from "@angular/core/rxjs-interop";
import {map} from "rxjs";

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {
	detailId: Signal<number> = toSignal(this.route.params.pipe(
		map((params) => params['id'])
	))

	constructor(private route: ActivatedRoute) {}
}
