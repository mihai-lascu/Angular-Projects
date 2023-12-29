import { Component, computed } from '@angular/core';
import { TodoService } from "../shared/data-access/todo.service";
import { ActivatedRoute } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-detail',
	standalone: true,
	imports: [],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export default class DetailComponent {
	private paramMap = toSignal(this.route.paramMap);

	todo = computed(() =>
		this.todoService.todos().find((todo) => todo.id === this.paramMap()?.get('id'))
	);

	constructor(
		private todoService: TodoService,
		private route: ActivatedRoute
	) {}
}
