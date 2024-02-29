import {
    AfterContentInit,
    Component,
    computed,
    ContentChild,
    ContentChildren,
    input,
    QueryList, TemplateRef,
    ViewChild,
} from '@angular/core';
import {
    MatColumnDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { CommonModule } from "@angular/common";

export type ColumnDefinition = {
    key: string;
    name: string;
    show: boolean;
    isTemplate: boolean;
    pipeFn?: () => {}
};

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [ MatTableModule, MatSortModule, CommonModule ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T> implements AfterContentInit {
    @ContentChildren(MatHeaderRowDef) headerRowDefs: QueryList<MatHeaderRowDef>;
    @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;
    @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;
    @ContentChild(MatNoDataRow) noDataRow: MatNoDataRow;

    @ContentChild(TemplateRef) customTemplate: TemplateRef<any>;

    @ViewChild(MatTable, {static: true}) table: MatTable<T>;

    dataSource = input.required<MatTableDataSource<T>>();
    columns = input.required<ColumnDefinition[]>();
    columnsToDisplay = computed(() =>
        this.columns()
            .filter((column) => column.show)
            .map((column) => column.key)
    )

    constructor() {}

    ngAfterContentInit() {
        this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));
        this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
        this.headerRowDefs.forEach(headerRowDef => this.table.addHeaderRowDef(headerRowDef));
        this.table.setNoDataRow(this.noDataRow);
    }
}