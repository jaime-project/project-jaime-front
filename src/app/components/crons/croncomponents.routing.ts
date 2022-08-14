import { Routes } from '@angular/router';
import { ListCronComponent } from './list/list.component';
import { NewCronComponent } from './new/new.component';
import { TabsCronComponent } from './tabs/tabs.component';


export const CronComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'crons',
				component: ListCronComponent,
				data: {
					title: 'crons',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Crons' }
					]
				}
			},
			{
				path: 'crons/details/:id',
				component: TabsCronComponent,
				data: {
					title: 'crons',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Crons' }
					]
				}
			},
			{
				path: 'crons/new',
				component: NewCronComponent,
				data: {
					title: 'crons',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Crons' }
					]
				}
			},
		]
	}
];
