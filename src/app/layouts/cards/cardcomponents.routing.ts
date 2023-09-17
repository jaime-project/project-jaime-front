import { Routes } from '@angular/router';
import { ListCardComponent } from './list/list.component';


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
			// {
			// 	path: 'cards/details/:id',
			// 	component: TabsCronComponent,
			// 	data: {
			// 		title: 'cards',
			// 		urls: [
			// 			{ title: 'ngComponent' },
			// 			{ title: 'Cards' }
			// 		]
			// 	}
			// },
			// {
			// 	path: 'cards/new',
			// 	component: NewCronComponent,
			// 	data: {
			// 		title: 'cards',
			// 		urls: [
			// 			{ title: 'ngComponent' },
			// 			{ title: 'Cards' }
			// 		]
			// 	}
			// },
		]
	}
];
