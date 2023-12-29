import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Todo} from "../../../shared/types/todo";

@Component({
	selector: 'app-todo-form',
	standalone: true,
	imports: [ReactiveFormsModule],
	templateUrl: './todo-form.component.html',
	styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
	@Output() todoSubmitted = new EventEmitter<Todo>();
	todoForm = this.fb.nonNullable.group({
		title: ['', Validators.required],
		description: ['']
	});

	constructor(private fb: FormBuilder) {}
}
