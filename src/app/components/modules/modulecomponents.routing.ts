import { Routes } from '@angular/router';
import { ListModuleComponent } from './list/list.component';
import { NewModuleComponent } from './new/new.component';
import { TabsModuleComponent } from './tabs/tabs.component';


export const ModuleComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'repos/:repo/modules',
				component: ListModuleComponent,
				data: {
					title: 'Modules',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Modules' }
					]
				}
			},
			{
				path: 'repos/:repo/modules/details/:name',
				component: TabsModuleComponent,
				data: {
					title: 'Modules',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Modules' }
					]
				}
			},
			{
				path: 'repos/:repo/modules/new',
				component: NewModuleComponent,
				data: {
					title: 'Modules',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Modules' }
					]
				}
			},
		]
	}
];
