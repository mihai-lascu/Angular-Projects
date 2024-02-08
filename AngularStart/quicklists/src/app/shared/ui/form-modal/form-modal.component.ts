import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { KeyValuePipe } from "@angular/common";

@Component({
    selector: 'app-form-modal',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        KeyValuePipe
    ],
    templateUrl: './form-modal.component.html',
    styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {
    formGroup = input.required<FormGroup>();
    title = input.required<string>();
    @Output() save = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();
}
