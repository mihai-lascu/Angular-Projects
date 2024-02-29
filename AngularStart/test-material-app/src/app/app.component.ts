import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
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

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCardModule,
        TableComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    columns: ColumnDefinition[] = [
        {key: 'id', name: 'Id', show: true, isTemplate: false},
        {key: 'product', name: 'Product', show: false, isTemplate: false},
        {key: 'manufacturers', name: 'Manufacturers', show: true, isTemplate: true},
        {key: 'quantity', name: 'Quantity', show: true, isTemplate: false},
    ];
    dataSource = new MatTableDataSource(dummyData);

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
