import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateTodo} from "../../../shared/types/todo";

@Component({
	selector: 'app-todo-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './todo-form.component.html',
	styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
	@Output() todoSubmitted = new EventEmitter<CreateTodo>();
	todoForm = this.fb.nonNullable.group({
		title: ['', Validators.required],
		description: ['']
	});

	constructor(private fb: FormBuilder) {}
}
