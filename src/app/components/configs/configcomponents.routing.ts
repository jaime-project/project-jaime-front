import { Routes } from '@angular/router';
import { TabsConfigComponent } from './tabs/tabs.component';


export const ConfigComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'configs',
				component: TabsConfigComponent,
				data: {
					title: 'configs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Configs' }
					]
				}
			},
		]
	}
];
