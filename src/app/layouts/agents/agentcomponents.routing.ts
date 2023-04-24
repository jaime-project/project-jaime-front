import { Routes } from '@angular/router';
import { ListAgentComponent } from './list/list.component';
import { TabsAgentComponent } from './tabs/tabs.component';


export const AgentComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'agents',
				component: ListAgentComponent,
				data: {
					title: 'agents',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Agents' }
					]
				}
			},
			{
				path: 'agents/details/:id',
				component: TabsAgentComponent,
				data: {
					title: 'agents',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Agents' }
					]
				}
			},
		]
	}
];
