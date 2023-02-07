import { AuthMode } from 'src/app/auth/auth.enum';

export const environment = {
	production: false,
	authMode: AuthMode.Firebase,
	firebase: {
		projectId: 'genghis-project',
		appId: '1:564989676810:web:bcdfc703a758cf56bafef3',
		storageBucket: 'genghis-project.appspot.com',
		apiKey: 'AIzaSyCpWjoDY16xxF69lCcHR8ENYZTTXl6BbcA',
		authDomain: 'genghis-project.firebaseapp.com',
		messagingSenderId: '564989676810',
	},
};
