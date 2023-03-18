import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const primeModules = [CardModule, InputTextModule, ButtonModule];

@NgModule({
	declarations: [LoginComponent],
	imports: [
		CommonModule,
		RouterModule.forChild([
			{ path: '', component: LoginComponent, pathMatch: 'full' },
		]),
		FormsModule,
		ReactiveFormsModule,
		primeModules,
	],
	providers: [],
})
export class LoginModule {}
