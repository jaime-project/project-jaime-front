import { Routes } from '@angular/router';
import { ListWorkComponent } from './list/list.component';
import { NewWorkComponent } from './new/new.component';
import { TabsWorkComponent } from './tabs/tabs.component';


export const WorkComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'works',
				component: ListWorkComponent,
				data: {
					title: 'jobs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Jobs' }
					]
				}
			},
			{
				path: 'works/details/:id',
				component: TabsWorkComponent,
				data: {
					title: 'jobs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Jobs' }
					]
				}
			},
			{
				path: 'works/new',
				component: NewWorkComponent,
				data: {
					title: 'jobs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Jobs' }
					]
				}
			},
		]
	}
];
