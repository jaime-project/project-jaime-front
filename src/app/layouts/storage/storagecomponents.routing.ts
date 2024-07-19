import { Routes } from '@angular/router';
import { ListStorageComponent } from './list/list.component';


export const StorageComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'storage',
				component: ListStorageComponent,
				data: {
					title: 'Storages',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Storages' }
					]
				}
			},
		]
	}
];
