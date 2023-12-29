import {Routes} from '@angular/router';

export const routes: Routes = [
	{
		path: 'home',
		loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
	},
	{
		path: 'settings',
		loadComponent: () => import('./settings/settings.component').then((m) => m.SettingsComponent)
	},
	{
		path: 'detail/:id',
		loadComponent: () => import('./detail/detail.component').then((m) => m.DetailComponent)
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];
