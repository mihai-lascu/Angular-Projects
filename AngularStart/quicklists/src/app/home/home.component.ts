import { Component, effect, signal } from '@angular/core';
import { ModalComponent } from "../shared/ui/modal/modal.component";
import { Checklist } from "../shared/interfaces/checklist";
import { FormBuilder } from "@angular/forms";
import { FormModalComponent } from "../shared/ui/form-modal/form-modal.component";
import { ChecklistService } from "../shared/data-access/checklist.service";
import { ChecklistListComponent } from "./ui/checklist-list/checklist-list.component";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        ModalComponent,
        FormModalComponent,
        ChecklistListComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export default class HomeComponent {
    checklistBeingEdited = signal<Partial<Checklist> | null>(null);
    checklistForm = this.formBuilder.nonNullable.group({
        title: ['']
    });

    constructor(
        private formBuilder: FormBuilder,
        public checklistService: ChecklistService
    ) {
        effect(() => {
            const checklist = this.checklistBeingEdited();
            if (!checklist) {
                this.checklistForm.reset();
            } else {
                this.checklistForm.patchValue({
                    title: checklist.title
                });
            }
        })
    }
}
