import {Component} from '@angular/core';
import {TodoFormComponent} from "./ui/todo-form/todo-form.component";
import {Todo} from "../shared/types/todo";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [TodoFormComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export default class HomeComponent {
	createTodo(todo: Todo) {
		console.log(todo);
	}
}
