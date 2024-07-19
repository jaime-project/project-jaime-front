import { Routes } from '@angular/router';
import { DetailStorageComponent } from './detail/detail.component';
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
			{
				path: 'storage/:name/datails',
				component: DetailStorageComponent,
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
