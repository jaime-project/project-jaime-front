import { Routes } from '@angular/router';
import { ListAgentComponent } from './agents/list/list.component';
import { TabsAgentComponent } from './agents/tabs/tabs.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'works',
				component: ListAgentComponent,
				data: {
					title: 'Works',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Works' }
					]
				}
			},
						{
				path: 'configs',
				component: TabsAgentComponent,
				data: {
					title: 'Configs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Configs' }
					]
				}
			}
		]
	}
];
