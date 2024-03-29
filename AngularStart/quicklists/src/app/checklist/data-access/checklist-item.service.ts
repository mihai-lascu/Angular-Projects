import { computed, effect, Injectable, signal } from '@angular/core';
import {
    AddChecklistItem,
    ChecklistItem, EditChecklistItem,
    RemoveChecklistItem
} from "../../shared/interfaces/checklist-item";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RemoveChecklist } from "../../shared/interfaces/checklist";
import { StorageService } from "../../shared/data-access/storage.service";

export interface ChecklistItemsState {
    checklistItems: ChecklistItem[];
    loaded: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class ChecklistItemService {
    private state = signal<ChecklistItemsState>({
        checklistItems: [],
        loaded: false,
        error: null
    })
    private checklistItemsLoaded$ = this.storageService.loadChecklistItems();

    checklistItems = computed(() => this.state().checklistItems);
    loaded = computed(() => this.state().loaded);

    add$ = new Subject<AddChecklistItem>();
    delete$ = new Subject<RemoveChecklistItem>();
    edit$ = new Subject<EditChecklistItem>();
    toggle$ = new Subject<RemoveChecklistItem>();
    reset$ = new Subject<RemoveChecklist>();
    checklistRemoved$ = new Subject<RemoveChecklist>();

    constructor(
        private storageService: StorageService
    ) {
        this.checklistItemsLoaded$.pipe(takeUntilDestroyed()).subscribe({
            next: (checklistItems) => this.state.update((state) => ({
                ...state,
                checklistItems,
                loaded: true
            })),
            error: (err) => this.state.update((state) => ({
                ...state,
                error: err
            }))
        })
        this.add$.pipe(takeUntilDestroyed()).subscribe((checklistItem) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: [
                    ...state.checklistItems,
                    {
                        ...checklistItem.item,
                        id: Date.now().toString(),
                        checklistId: checklistItem.checklistId,
                        checked: false
                    }
                ]
            }))
        );
        this.delete$.pipe(takeUntilDestroyed()).subscribe((id) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.filter(
                    (item) => item.id !== id
                )
            }))
        );
        this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.map((item) =>
                    item.id === update.id
                    ? { ...item, title: update.data.title }
                    : item
                )
            }))
        );
        this.toggle$.pipe(takeUntilDestroyed()).subscribe((checklistItemId) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.map((item) =>
                    item.id === checklistItemId
                    ? { ...item, checked: !item.checked }
                    : item
                )
            }))
        );
        this.reset$.pipe(takeUntilDestroyed()).subscribe((checklistId) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.map((item) =>
                    item.checklistId === checklistId
                    ? { ...item, checked: false }
                    : item
                )
            }))
        );
        this.checklistRemoved$.pipe(takeUntilDestroyed()).subscribe((id) =>
            this.state.update((state) => ({
                ...state,
                checklistItems: state.checklistItems.filter(
                    (item) => item.checklistId !== id
                )
            }))
        )
        effect(() => {
            if (this.loaded()) {
                this.storageService.saveChecklistItems(this.checklistItems());
            }
        });
    }
}
