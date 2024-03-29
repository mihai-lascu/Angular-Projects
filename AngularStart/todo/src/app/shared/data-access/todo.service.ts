import { Injectable, signal } from '@angular/core';
import { CreateTodo, Todo } from "../types/todo";

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	#todos = signal<Todo[]>([]);

	todos = this.#todos.asReadonly();

	addTodo(todo: CreateTodo) {
		this.#todos.update((todos) => [
			...todos,
			{ ...todo, id: Date.now().toString() }
		]);
	}
}
