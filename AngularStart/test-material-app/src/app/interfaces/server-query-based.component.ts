import {
    Directive,
    OnDestroy,
    OnInit
} from '@angular/core';
import { Params } from "@angular/router";
import { debounceTime, Subject, Subscription } from "rxjs";

@Directive()
export abstract class ServerQueryBasedComponent implements OnInit, OnDestroy {
    resetFilters$: Subject<void> = new Subject<void>();
    headers: any[] = [];
    filterBy: any[] = [];
    emphasisedFilters: any[] = [];
    results: Array<any> = [];
    total = 0;
    fetching: boolean = false;
    shouldRefresh: boolean = false;
    totalPages: number = 0;
    queryParams!: Params;
    initialSort: {sortBy: string, desc: boolean} = {sortBy: '', desc: true};
    entityService: any;
    mapFunction!: (data: any) => any;
    updatedEntityId: any;
    queryEntitiesSubscription!: Subscription;
    clearFiltersSubscription!: Subscription;

    abstract addListeners(): void;
    abstract removeListeners(): void;
    abstract onFiltering(filterData: any): void;
    abstract success(): void;

    constructor() {}

    ngOnInit(): void {
        this.setHeaders();
        this.setFilters();
        this.setEmphasisedFilters();
        this.setQueryParams();
        this.queryEntities();
        this.addListeners();
    }

    onClearFilters(): void {
        this.resetFilters$.next();
    }

    ngOnDestroy(): void {
        if (this.clearFiltersSubscription && this.clearFiltersSubscription.unsubscribe) {
            this.clearFiltersSubscription.unsubscribe();
        }

        this.cancelPreviousRequest();
        this.removeListeners();
    }

    setService(entityService: any) {
        this.entityService = entityService;
    }

    setMapFct(mapFct: (data: any) => any) {
        this.mapFunction = mapFct;
    }

    setQueryParams() {
        this.queryParams = {};

        this.queryParams['limit'] = '50';
        this.queryParams['page'] = '0';
        this.queryParams['sort'] = '';
    }

    queryEntities(debounceTimeMs: number = 0) {
        this.fetching = true;
        this.cancelPreviousRequest();
        this.queryEntitiesSubscription = this.getQueryObservable()
            .pipe(debounceTime(debounceTimeMs))
            .subscribe(this.successHandler.bind(this));
    }

    successHandler(data: any) {
        this.results = this.getItems(data);
        this.total = data.total;
        this.totalPages = data.totalPages;
        this.initialSort = {
            sortBy: data.sortBy,
            desc: data.desc
        };
        this.fetching = false;
        this.shouldRefresh = false;

        this.success();
    }

    getItems(data: {items: any[]}) {
        return data.items.map(this.mapFunction.bind(this));
    }

    getQueryObservable() {
        return this.entityService.query(this.queryParams);
    }

    sort(sortData: {sortBy: string, order: string}) {
        this.queryParams['sort'] = `${sortData.sortBy},${sortData.order}`;
        this.queryEntities();
    }

    filter(filterData: any) {
        this.resetPages();
        this.onFiltering(filterData);
        this.queryEntities();
    }

    onPageChange(page: number) {
        this.queryParams['page'] = page - 1;
        this.queryEntities();
    }

    onShownPerPageChange(shownPerPage: number) {
        this.queryParams['limit'] = shownPerPage;
        this.queryEntities();
    }

    highlightEnd() {
        this.updatedEntityId = null;
    }

    protected resetPages() {
        this.queryParams['page'] = 0;
    }

    protected cancelPreviousRequest() {
        if (this.queryEntitiesSubscription) {
            this.queryEntitiesSubscription.unsubscribe();
        }
    }

    protected setHeaders() {}

    protected setFilters() {}

    protected setEmphasisedFilters() {}
}
