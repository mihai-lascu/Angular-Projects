import {
    Component,
    computed,
    contentChild,
    input,
    TemplateRef,
    viewChild,
} from '@angular/core';
import {
    MatTable,
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { CommonModule } from "@angular/common";
import { FunctionPipe } from "../pipes/function.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";

export type ColumnDefinition = {
    key: string;
    name: string;
    show: boolean;
    isTemplate: boolean;
    tooltipText?: string;
    css?: string[];
    pipeFn?: (element: any) => any;
};

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        MatTableModule,
        MatSortModule,
        CommonModule,
        FunctionPipe,
        MatTooltipModule
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T> {
    customTemplate = contentChild.required(TemplateRef);
    table = viewChild.required(MatTable<T>);

    dataSource = input.required<MatTableDataSource<T>>();
    columns = input.required<ColumnDefinition[]>();
    columnsToDisplay = computed(() =>
        this.columns()
            .filter((column) => column.show)
            .map((column) => column.key)
    )
}