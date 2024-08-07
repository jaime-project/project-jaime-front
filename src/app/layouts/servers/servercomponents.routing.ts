import { Routes } from '@angular/router';
import { ListServerComponent } from './list/list.component';
import { NewServerComponent } from './new/new.component';
import { TabsServerComponent } from './tabs/tabs.component';
import { YamlServerComponent } from './yaml/yaml.component';
import { DetailServerComponent } from './detail/detail.component';


export const ServerComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'servers',
				component: ListServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'servers' }
					]
				}
			},
			{
				path: 'servers/new',
				component: NewServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'servers' }
					]
				}
			},
			{
				path: 'servers/details/:name',
				component: TabsServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'servers' }
					]
				}
			},
		]
	}
];
