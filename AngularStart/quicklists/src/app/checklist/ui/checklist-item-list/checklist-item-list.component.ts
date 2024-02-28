import { Component, EventEmitter, input, Output } from '@angular/core';
import {
    ChecklistItem,
    RemoveChecklistItem
} from "../../../shared/interfaces/checklist-item";

@Component({
    selector: 'app-checklist-item-list',
    standalone: true,
    imports: [],
    templateUrl: './checklist-item-list.component.html',
    styleUrl: './checklist-item-list.component.scss'
})
export class ChecklistItemListComponent {
    checklistItems = input.required<ChecklistItem[]>();
    @Output() toggle = new EventEmitter<RemoveChecklistItem>();
    @Output() delete = new EventEmitter<RemoveChecklistItem>();
    @Output() edit = new EventEmitter<ChecklistItem>;
}
