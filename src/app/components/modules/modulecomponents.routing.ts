import { Routes } from '@angular/router';
import { ListModuleComponent } from './list/list.component';
import { NewModuleComponent } from './new/new.component';
import { TabsModuleComponent } from './tabs/tabs.component';


export const ModuleComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'modules',
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
				path: 'modules/details/:name',
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
				path: 'modules/new',
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
