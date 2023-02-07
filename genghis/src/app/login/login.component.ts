import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
	catchError,
	combineLatest,
	filter,
	Subject,
	takeUntil,
	tap,
} from 'rxjs';
import { Role } from '../auth/auth.enum';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
	public loginForm!: FormGroup;
	public loginError = '';
	private componentedDestroyed$: Subject<boolean> = new Subject();

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.authService.logout(true);
		this.buildLoginForm();
	}

	buildLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					Validators.maxLength(50),
				],
			],
		});
	}

	login() {
		this.authService
			.login(this.loginForm.value.email, this.loginForm.value.password)
			.pipe(
				catchError((err) => (this.loginError = err.message)),
				takeUntil(this.componentedDestroyed$)
			)
			.subscribe();

		combineLatest([this.authService.authStatus$, this.authService.currentUser$])
			.pipe(
				filter(
					([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''
				),
				tap(([authStatus, user]) => {
					this.router.navigate([this.homeRoutePerRole(user.role as Role)]);
				}),
				takeUntil(this.componentedDestroyed$)
			)
			.subscribe();
	}

	private homeRoutePerRole(role: Role) {
		switch (role) {
			case Role.Khan:
				return '/home';
			case Role.Mongol:
				return '/home';
			default:
				return '/home';
		}
	}

	ngOnDestroy(): void {
		this.componentedDestroyed$.next(true);
	}
}
