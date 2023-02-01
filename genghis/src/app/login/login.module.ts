import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

const materialModules = [
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatFormFieldModule,
	MatExpansionModule,
	MatButtonModule,
	MatGridListModule,
];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: LoginComponent, pathMatch: 'full' },
		]),
		FormsModule,
		ReactiveFormsModule,
		...materialModules,
	],
	providers: [],
})
export class LoginModule {}
