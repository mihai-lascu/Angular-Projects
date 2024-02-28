import { computed, effect, Injectable, signal } from '@angular/core';
import {
    AddChecklist,
    Checklist,
    EditChecklist
} from "../interfaces/checklist";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageService } from "./storage.service";
import { ChecklistItemService } from "../../checklist/data-access/checklist-item.service";

export interface ChecklistState {
    checklists: Checklist[];
    loaded: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class ChecklistService {
    private state = signal<ChecklistState>({
        checklists: [],
        loaded: false,
        error: null
    });
    private checklistsLoaded$ = this.storageService.loadChecklists();

    checklists = computed(() => this.state().checklists);
    loaded = computed(() => this.state().loaded);

    add$ = new Subject<AddChecklist>();
    delete$ = this.checklistItemService.checklistRemoved$;
    edit$ = new Subject<EditChecklist>()

    constructor(
        private storageService: StorageService,
        private checklistItemService: ChecklistItemService
    ) {
        this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe({
            next: (checklists) =>
                this.state.update((state) => ({
                    ...state,
                    checklists,
                    loaded: true
                })),
            error: (err) => this.state.update((state) => ({
                ...state,
                error: err
            }))
        })
        this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
            this.state.update((state) => ({
                ...state,
                checklists: [...state.checklists, this.addIdToChecklist(checklist)]
            }))
        );
        this.delete$.pipe(takeUntilDestroyed()).subscribe((id) =>
            this.state.update((state) => ({
                ...state,
                checklists: state.checklists.filter(
                    (checklist) => checklist.id !== id
                )
            }))
        );
        this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
            this.state.update((state) => ({
                ...state,
                checklists: state.checklists.map((checklist) =>
                    checklist.id === update.id
                    ? { ...checklist, title: update.data.title }
                    : checklist
                )
            }))
        );
        effect(() => {
            if (this.loaded()) {
                this.storageService.saveChecklists(this.checklists());
            }
        });
    }

    private addIdToChecklist(checklist: AddChecklist) {
        return {
            ...checklist,
            id: this.generateSlug(checklist.title)
        };
    }

    private generateSlug(title: string) {
        let slug = title.toLowerCase().replace(/\s+/g, '-');

        const matchingSlugs = this.checklists().find(
            (checklist) => checklist.id === slug
        );

        if (matchingSlugs) {
            slug = slug + Date.now().toString();
        }

        return slug;
    }
}
