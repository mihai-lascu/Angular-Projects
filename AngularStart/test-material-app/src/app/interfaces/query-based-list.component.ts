import { Directive, OnInit } from "@angular/core";
import { ServerQueryBasedComponent } from "./server-query-based.component";
import { ActionSelectConfig } from "./action-select.config";
import { HttpClient } from "@angular/common/http";

@Directive()
export abstract class QueryBasedList extends ServerQueryBasedComponent implements OnInit {
    listName!: string;
    currentPage: number;
    shownPerPage!: number;
    filtersDirty = false;
    file!: File;
    filterData: Record<any, any> = {};

    downloading = false;

    listActions: ActionSelectConfig = new ActionSelectConfig();

    constructor(
        protected backend?: HttpClient
    ) {
        super();
        if (!this.shownPerPage) {
            this.shownPerPage = Number('50');
        }
        this.currentPage = 1;
    }

    getFilterEnabledForUserPref() {
        let filterEnabledList: any = {};
        // filterConfig.forEach((filter) => {
        //     filter.enabled = filterEnabledList.hasOwnProperty(filter.key) ? filterEnabledList[filter.key] : true;
        // });
        this.updateFilterSelectAction();
    }

    updateFilterSelectAction() {
        this.listActions.actions = [];
    }

    override ngOnInit() {
        super.ngOnInit();
        this.updateFilterSelectAction();
        this.filterData = {} // this.userPrefService.getLastUsedFilter(this.listName);
    }

    override setQueryParams() {
        super.setQueryParams();

        if (!this.isFilterDataEmpty(this.filterData)) {
            this.onFiltering(this.filterData);
        }
    }

    dirtyChanged(newValue: boolean) {
        this.filtersDirty = newValue;
    }

    override onPageChange(page: number) {
        super.onPageChange(page);
        this.currentPage = page;
    }

    override successHandler(data: any) {
        super.successHandler(data);
    }

    onFiltering(filterData: any) {
        // this.userPrefService.setLastUsedFilter(this.listName, filterData);
    }

    isFilterDataEmpty(filterData: any) {
        if (!filterData || Object.keys(filterData).length === 0) { return true; }
        let isEmpty = true;
        Object.keys(filterData).forEach((key) => {
            if (filterData[key]) {
                isEmpty = false;
            }
        });

        return isEmpty;
    }
}