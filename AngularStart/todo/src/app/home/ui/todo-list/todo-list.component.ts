import {Component, Input} from '@angular/core';
import {Todo} from "../../../shared/types/todo";

@Component({
	selector: 'app-todo-list',
	standalone: true,
	imports: [],
	templateUrl: './todo-list.component.html',
	styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
	@Input({required: true}) todos!: Todo[];
}
