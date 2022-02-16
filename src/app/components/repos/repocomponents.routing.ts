import { Routes } from '@angular/router';
import { ListModuleComponent } from './list/list.component';
import { NewRepoComponent } from './new/new.component';


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
			{
				path: 'repos/new',
				component: NewRepoComponent,
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
