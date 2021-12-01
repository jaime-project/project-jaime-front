import { Routes } from '@angular/router';
import { ListAgentComponent } from './agents/list/list.component';
import { TabsAgentComponent } from './agents/tabs/tabs.component';
import { ListModuleComponent } from './modules/list/list.component';
import { NewTabsModuleComponent } from './modules/newtabs/newtabs.component';
import { TabsModuleComponent } from './modules/tabs/tabs.component';
import { ListServerComponent } from './servers/list/list.component';
import { NewServerComponent } from './servers/new/new.component';
import { TabsServerComponent } from './servers/tabs/tabs.component';


export const ComponentsRoutes: Routes = [
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
				path: 'modules/details',
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
				component: NewTabsModuleComponent,
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
						{ title: 'ngComponent' },
						{ title: 'Configs' }
					]
				}
			}
		]
	}
];
