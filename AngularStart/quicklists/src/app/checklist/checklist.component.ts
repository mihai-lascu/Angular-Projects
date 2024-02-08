import { Component, computed } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ChecklistService } from "../shared/data-access/checklist.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { ChecklistHeaderComponent } from "./ui/checklist-header/checklist-header.component";

@Component({
    selector: 'app-checklist',
    standalone: true,
    imports: [
        ChecklistHeaderComponent
    ],
    templateUrl: './checklist.component.html',
    styleUrl: './checklist.component.scss'
})
export default class ChecklistComponent {
    params = toSignal(this.route.paramMap);

    checklist = computed(() =>
        this.checklistService
            .checklists()
            .find((checklist) => checklist.id === this.params()?.get('id'))
    );

    constructor(
        private route: ActivatedRoute,
        public checklistService: ChecklistService
    ) {}
}
