import { Routes } from '@angular/router';
import { ListModuleComponent } from './list/list.component';


export const RepoComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'repos',
				component: ListModuleComponent,
				data: {
					title: 'Repositories',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Repos' }
					]
				}
			},
		]
	}
];
