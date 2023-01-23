import { Routes } from '@angular/router';
import { ListJobComponent } from './list/list.component';
import { NewJobComponent } from './new/new.component';
import { TabsJobComponent } from './tabs/tabs.component';


export const JobsComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'jobs',
				component: ListJobComponent,
				data: {
					title: 'jobs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Jobs' }
					]
				}
			},
			{
				path: 'jobs/details/:id',
				component: TabsJobComponent,
				data: {
					title: 'jobs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Jobs' }
					]
				}
			},
			{
				path: 'jobs/new',
				component: NewJobComponent,
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
