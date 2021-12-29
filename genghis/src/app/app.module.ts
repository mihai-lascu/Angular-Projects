import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
// components
import { HomeComponent } from './components/home/home.component'
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { KahnCardComponent } from './components/kahn-card/kahn-card.component'
import { StarRatingComponent } from './components/star-rating/star-rating.component'
import { KahnFilterComponent } from './components/kahn-filter/kahn-filter.component'
// angular material
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'

const materialModules = [
	MatIconModule,
	MatListModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
	MatCardModule,
	MatTabsModule,
	MatToolbarModule,
	MatButtonModule,
	MatSidenavModule,
]

@NgModule({
	declarations: [AppComponent, HomeComponent, PageNotFoundComponent, NavigationMenuComponent, UserProfileComponent, KahnCardComponent, StarRatingComponent, KahnFilterComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ...materialModules, FormsModule, ReactiveFormsModule, HttpClientModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
