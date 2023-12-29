import {Injectable, signal} from '@angular/core';
import {Todo} from "../types/todo";

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	#todos = signal<Todo[]>([]);

	todos = this.#todos.asReadonly();

	addTodo(todo: Todo) {
		this.#todos.update((todos) => [...todos, todo]);
	}
}
