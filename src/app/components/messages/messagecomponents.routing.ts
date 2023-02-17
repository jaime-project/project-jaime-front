import { Routes } from '@angular/router';
import { ListJobComponent } from './list/list.component';
import { TabsJobComponent } from './tabs/tabs.component';


export const MessageComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'messages',
				component: ListJobComponent,
				data: {
					title: 'messages',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'messages' }
					]
				}
			},
			{
				path: 'messages/details/:id',
				component: TabsJobComponent,
				data: {
					title: 'messages',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'messages' }
					]
				}
			}
		]
	}
];
