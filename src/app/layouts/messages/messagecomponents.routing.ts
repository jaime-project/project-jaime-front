import { Routes } from '@angular/router';
import { ListMessageComponent } from './list/list.component';
import { TabsMessageComponent } from './tabs/tabs.component';


export const MessageComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'messages',
				component: ListMessageComponent,
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
				component: TabsMessageComponent,
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
