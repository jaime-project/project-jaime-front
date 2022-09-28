import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';


export const LoginRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'signin',
				component: SigninComponent,
				data: {
					title: 'signin',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Signin' }
					]
				}
			},
		]
	}
];
