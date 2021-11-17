import { Routes } from '@angular/router';
import { NgbdAlertBasicComponent } from '../component/alert/alert.component';
import { NgbdDropdownBasicComponent } from '../component/dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from '../component/modal/modal.component';
import { NgbdtabsBasicComponent } from '../component/tabs/tabs.component';
import { TabsServerComponent } from '../components/servers/tabs/tabs.component';
import { ListServerComponent } from './servers/list/list.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'works',
				component: NgbdAlertBasicComponent,
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
				path: 'asd',
				component: NgbdModalBasicComponent,
				data: {
					title: 'asd',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'ads' }
					]
				}
			},
			{
				path: 'agents',
				component: NgbdDropdownBasicComponent,
				data: {
					title: 'Agents',
					urls: [
						{ title: 'Dashboard', url: '/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Agents' }
					]
				}
			},
			{
				path: 'configs',
				component: NgbdtabsBasicComponent,
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
