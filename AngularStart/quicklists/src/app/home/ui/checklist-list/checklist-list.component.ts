import { Component, EventEmitter, input, Output } from '@angular/core';
import {
    Checklist,
    RemoveChecklist
} from "../../../shared/interfaces/checklist";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-checklist-list',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './checklist-list.component.html',
  styleUrl: './checklist-list.component.scss'
})
export class ChecklistListComponent {
    checklists = input.required<Checklist[]>();
    @Output() delete = new EventEmitter<RemoveChecklist>();
    @Output() edit = new EventEmitter<Checklist>();
}
