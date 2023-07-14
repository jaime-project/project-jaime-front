import { Routes } from '@angular/router';
import { ListModuleComponent } from './list/list.component';
import { NewRepoComponent } from './new/new.component';
import { TabsRepoComponent } from './tabs/tabs.component';


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
			{
				path: 'repos/:repo/details',
				component: TabsRepoComponent,
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
