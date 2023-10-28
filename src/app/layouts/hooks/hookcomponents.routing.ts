import { Routes } from '@angular/router';
import { ListHookComponent } from './list/list.component';
import { NewHookComponent } from './new/new.component';
import { TabsHookComponent } from './tabs/tabs.component';


export const HookComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'hooks',
				component: ListHookComponent,
				data: {
					title: 'hooks',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Hooks' }
					]
				}
			},
			{
				path: 'hooks/details/:id',
				component: TabsHookComponent,
				data: {
					title: 'hooks',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Hooks' }
					]
				}
			},
			{
				path: 'hooks/new',
				component: NewHookComponent,
				data: {
					title: 'hooks',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Hooks' }
					]
				}
			},
		]
	}
];
