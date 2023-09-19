import { Routes } from '@angular/router';
import { ListCardComponent } from './list/list.component';
import { NewCardComponent } from './new/new.component';
import { TabsCardComponent } from './tabs/tabs.component';


export const CardComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'cards',
				component: ListCardComponent,
				data: {
					title: 'cards',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
			{
				path: 'cards/details/:id',
				component: TabsCardComponent,
				data: {
					title: 'cards',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
			{
				path: 'cards/new',
				component: NewCardComponent,
				data: {
					title: 'cards',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Cards' }
					]
				}
			},
		]
	}
];
