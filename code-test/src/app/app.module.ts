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
import { CardComponent } from './card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StatusReportComponent } from './cards/status-report/status-report.component';
import { PerformanceComponent } from './cards/performance/performance.component';
import { PrinterActionsComponent } from './cards/printer-actions/printer-actions.component';
import { JobActionsComponent } from './cards/job-actions/job-actions.component';

@NgModule({
	declarations: [
		AppComponent,
		StatusBarComponent,
		DashboardComponent,
		CardComponent,
		StatusReportComponent,
		PerformanceComponent,
		PrinterActionsComponent,
		JobActionsComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		ModalModule,
		MatDialogModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatCardModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
