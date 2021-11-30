import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'my-profile', component: UserProfileComponent },
	{ path: '**', component: PageNotFoundComponent },
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
