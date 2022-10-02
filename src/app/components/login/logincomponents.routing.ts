import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';


export const LoginRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
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
