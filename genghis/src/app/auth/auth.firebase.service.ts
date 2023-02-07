import { Injectable } from '@angular/core';
import {
	Auth as FireAuth,
	signInWithEmailAndPassword,
	User as FireUser,
	authState,
	UserCredential,
} from '@angular/fire/auth';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IUser, User } from '../user/user';
import { Role } from './auth.enum';
import {
	AuthService,
	IAuthStatus,
	IServerAuthResponse,
	defaultAuthStatus,
} from './auth.service';

interface IJwtToken {
	email: string;
	iat: number;
	exp: number;
	sub: string;
}

@Injectable()
export class FirebaseAuthService extends AuthService {
	constructor(private afAuth: FireAuth) {
		super();
	}

	protected authProvider(
		email: string,
		password: string
	): Observable<IServerAuthResponse> {
		const serverResponse$: Observable<IServerAuthResponse> = from(
			signInWithEmailAndPassword(this.afAuth, email, password)
		).pipe(
			switchMap((res: UserCredential) =>
				from(res.user.getIdToken()).pipe(
					map((token) => ({ accessToken: token } as IServerAuthResponse)),
					catchError((err) => throwError(() => err))
				)
			),
			catchError((err) => throwError(() => err))
		);

		// signInWithEmailAndPassword(this.afAuth, email, password).then(
		// 	(res) => {
		// 		const firebaseUser: FireUser | null = res.user;
		// 		firebaseUser?.getIdToken().then(
		// 			(token) =>
		// 				serverResponse$.next({
		// 					accessToken: token,
		// 				} as IServerAuthResponse),
		// 			(err) => serverResponse$.error(err)
		// 		);
		// 	},
		// 	(err) => serverResponse$.error(err)
		// );

		return serverResponse$;
	}

	protected transformJwtToken(token: IJwtToken): IAuthStatus {
		if (!token) {
			return defaultAuthStatus;
		}

		return {
			isAuthenticated: token.email ? true : false,
			userId: token.sub,
			userRole: Role.None,
		};
	}

	protected getCurrentUser(): Observable<User> {
		return authState(this.afAuth).pipe(map(this.transformFirebaseUser));
	}

	private transformFirebaseUser(firebaseUser: FireUser | null): User {
		if (!firebaseUser) {
			return new User();
		}

		return User.Build({
			name: {
				first: firebaseUser?.displayName?.split(' ')[0] || 'Firebase',
				last: firebaseUser?.displayName?.split(' ')[1] || 'User',
			},
			picture: firebaseUser.photoURL,
			email: firebaseUser.email,
			_id: firebaseUser.uid,
			role: Role.None,
		} as IUser);
	}

	override logout() {
		if (this.afAuth) {
			this.afAuth.signOut();
		}
		this.clearToken();
		this.authStatus$.next(defaultAuthStatus);
	}
}
