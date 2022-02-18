import { Routes } from '@angular/router';
import { ListServerComponent } from './list/list.component';
import { NewServerComponent } from './new/new.component';
import { TabsServerComponent } from './tabs/tabs.component';


export const ServerComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'clusters',
				component: ListServerComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
			{
				path: 'clusters/new',
				component: NewServerComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
			{
				path: 'clusters/details/:name',
				component: TabsServerComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
		]
	}
];
