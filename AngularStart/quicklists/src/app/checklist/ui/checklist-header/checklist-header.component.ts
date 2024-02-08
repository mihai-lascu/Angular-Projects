import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Checklist } from "../../../shared/interfaces/checklist";

@Component({
    selector: 'app-checklist-header',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './checklist-header.component.html',
    styleUrl: './checklist-header.component.scss'
})
export class ChecklistHeaderComponent {
    checklist = input.required<Checklist>();
}
