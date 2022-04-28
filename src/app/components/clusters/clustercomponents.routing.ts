import { Routes } from '@angular/router';
import { ListClusterComponent } from './list/list.component';
import { NewClusterComponent } from './new/new.component';
import { TabsClusterComponent } from './tabs/tabs.component';


export const ClusterComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'clusters',
				component: ListClusterComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
			{
				path: 'clusters/new',
				component: NewClusterComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
			{
				path: 'clusters/details/:name',
				component: TabsClusterComponent,
				data: {
					title: 'clusters',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'clusters' }
					]
				}
			},
		]
	}
];
