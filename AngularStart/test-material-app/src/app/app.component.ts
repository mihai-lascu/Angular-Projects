import { Component, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { dummyData } from "./table/dummy-data";
import {
    MatPaginator,
    MatPaginatorModule,
    PageEvent
} from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ColumnDefinition, TableComponent } from "./table/table.component";
import { JsonPipe } from "@angular/common";
import { QuantityCellComponent } from "./cells/quantity-cell/quantity-cell.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
        TableComponent,
        JsonPipe,
        QuantityCellComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    paginator = viewChild.required(MatPaginator);
    sort = viewChild.required(MatSort);
    columns = signal<ColumnDefinition[]>([
        {
            key: 'id',
            name: 'Id',
            show: true,
            isTemplate: false,
            tooltipText: 'This is a tooltip about the id'
        },
        {
            key: 'product',
            name: 'Product',
            show: true,
            isTemplate: false,
            tooltipText: 'Product tooltip',
            pipeFn: (product) => product?.productNames?.join(', ') || ''
        },
        {
            key: 'manufacturers',
            name: 'Manufacturers',
            show: true,
            isTemplate: true,
            tooltipText: 'This column doesn\'t have a pipeFn'
        },
        {
            key: 'quantity',
            name: 'Quantity',
            show: true,
            isTemplate: true,
            tooltipText: 'No tooltip',
            pipeFn: (quantity) => {
                if (quantity?.value) {
                    return quantity?.value + ' ' + quantity?.uom?.name;
                } else {
                    return quantity;
                }
            }
        },
    ]);
    dataSource = signal(new MatTableDataSource(dummyData));

    constructor() {}

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement
        ).value;
        console.log('filterValue: ', filterValue);
    }

    sortChanged(event: Sort) {
        console.log('sort changed: ', event);
    }

    paginationChanged(event: PageEvent) {
        console.log('pagination changed: ', event);
    }
}
