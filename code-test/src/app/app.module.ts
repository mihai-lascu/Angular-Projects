import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from './modal/modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsModule } from './cards/cards.module';

@NgModule({
	declarations: [AppComponent, StatusBarComponent, DashboardComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ModalModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		CardsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
