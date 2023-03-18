import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule } from '@angular/forms';

const MaterialModules = [
	MatCheckboxModule,
	MatInputModule,
	MatDialogModule,
	MatButtonModule,
	MatDividerModule,
];

@NgModule({
	declarations: [ModalComponent],
	imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
})
export class ModalModule {}
