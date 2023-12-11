import { Routes } from '@angular/router';
import { ListLibraryComponent } from './list/list.component';
import { NewLibraryComponent } from './new/new.component';
import { TabsLibraryComponent } from './tabs/tabs.component';


export const LibraryComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'libraries',
				component: ListLibraryComponent,
				data: {
					title: 'libraries',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Librarys' }
					]
				}
			},
			{
				path: 'libraries/details/:id',
				component: TabsLibraryComponent,
				data: {
					title: 'libraries',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Librarys' }
					]
				}
			},
			{
				path: 'libraries/new',
				component: NewLibraryComponent,
				data: {
					title: 'libraries',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Libraries' }
					]
				}
			},
		]
	}
];
