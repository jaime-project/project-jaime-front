import { Routes } from '@angular/router';
import { ListServerComponent } from './servers/list/list.component';
import { NewServerComponent } from './servers/new/new.component';
import { ListAgentComponent } from './agents/list/list.component';
import { TabsAgentComponent } from './agents/tabs/tabs.component';
import { TabsServerComponent } from './servers/tabs/tabs.component';
import { TabsModuleComponent } from './modules/tabs/tabs.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'modules',
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
				path: 'works',
				component: ListServerComponent,
				data: {
					title: 'Works',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Works' }
					]
				}
			},
			{
				path: 'servers',
				component: ListServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Servers' }
					]
				}
			},
			{
				path: 'servers/new',
				component: NewServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Servers' }
					]
				}
			},
			{
				path: 'servers/details',
				component: TabsServerComponent,
				data: {
					title: 'servers',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Servers' }
					]
				}
			},
			{
				path: 'agents',
				component: ListAgentComponent,
				data: {
					title: 'agents',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Agents' }
					]
				}
			},
			{
				path: 'agents/details',
				component: TabsAgentComponent,
				data: {
					title: 'agents',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Agents' }
					]
				}
			},
			{
				path: 'configs',
				component: TabsAgentComponent,
				data: {
					title: 'Configs',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Configs' }
					]
				}
			}
		]
	}
];
