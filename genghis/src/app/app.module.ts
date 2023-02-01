import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth, Auth as FireAuth } from '@angular/fire/auth';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthService } from './auth/auth.service';
import { authFactory } from './auth/auth.factory';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@NgModule({
	declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth()),
		provideFirestore(() => getFirestore()),
		BrowserAnimationsModule,
	],
	providers: [
		{
			provide: AuthService,
			useFactory: authFactory,
			deps: [FireAuth],
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthHttpInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
