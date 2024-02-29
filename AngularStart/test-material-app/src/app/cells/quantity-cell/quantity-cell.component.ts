import { Component, input } from '@angular/core';
import { ColumnDefinition } from "../../table/table.component";
import { FunctionPipe } from "../../pipes/function.pipe";

type Quantity = {
    value: number,
    uom: {
        name: string
    }
} | number | undefined;

@Component({
  selector: 'app-quantity-cell',
  standalone: true,
    imports: [
        FunctionPipe
    ],
  templateUrl: './quantity-cell.component.html',
  styleUrl: './quantity-cell.component.scss'
})
export class QuantityCellComponent {
    quantity = input.required<Quantity>();
    column = input.required<ColumnDefinition>();
}
