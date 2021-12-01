import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppMaterialModule } from './app-material.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { KahnCardComponent } from './components/kahn-card/kahn-card.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component'

@NgModule({
	declarations: [AppComponent, HomeComponent, PageNotFoundComponent, NavigationMenuComponent, UserProfileComponent, KahnCardComponent, StarRatingComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, AppMaterialModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
