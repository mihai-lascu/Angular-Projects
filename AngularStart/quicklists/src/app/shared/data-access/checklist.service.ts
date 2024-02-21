import { computed, effect, Injectable, signal } from '@angular/core';
import { AddChecklist, Checklist } from "../interfaces/checklist";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { StorageService } from "./storage.service";

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

    constructor(
        private storageService: StorageService
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
