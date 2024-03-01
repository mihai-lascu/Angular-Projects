import {
    Component,
    computed,
    contentChild, EventEmitter,
    input, Output,
    signal,
    TemplateRef,
    viewChild,
} from '@angular/core';
import {
    MatTable,
    MatTableDataSource,
    MatTableModule
} from "@angular/material/table";
import { MatSortModule, Sort } from "@angular/material/sort";
import { CommonModule } from "@angular/common";
import { FunctionPipe } from "../pipes/function.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import { MatIconModule } from "@angular/material/icon";
import {
    debounceTime,
    fromEvent,
    map,
    startWith,
    throttleTime
} from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

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
        MatTooltipModule,
        MatButtonModule,
        MatIconModule
    ],
    animations: [
        trigger('detailExpand', [
            state('collapsed,void', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            ),
        ]),
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T> {
    @Output() sortChanged = new EventEmitter<Sort>();

    customTemplate = contentChild.required(TemplateRef);
    table = viewChild.required(MatTable<T>);

    dataSource = input.required<MatTableDataSource<T>>();
    columns = input.required<ColumnDefinition[]>();

    expandedElement = signal<T | null>(null);
    isMobile = toSignal(fromEvent(window, 'resize').pipe(
        startWith(window),
        map(() => window),
        throttleTime(500),
        debounceTime(500),
        map((window: Window) => window.innerWidth <= 740)
    ));

    columnsToDisplay = computed(() =>
        this.columns()
            .filter((column) => column.show)
            .map((column) => column.key)
    )
    columnsToDisplayWithExpand = computed(() =>
        [ ...this.columnsToDisplay(), 'expand' ]
    )
}
