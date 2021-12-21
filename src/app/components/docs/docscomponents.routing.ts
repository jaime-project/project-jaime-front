import { Routes } from '@angular/router';
import { ListDocsComponent } from './list/list.component';
import { NewDocsComponent } from './new/new.component';
import { TabsDocsComponent } from './tabs/tabs.component';


export const DocsComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'docs',
				component: ListDocsComponent,
				data: {
					title: 'docs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'docs' }
					]
				}
			},
			{
				path: 'docs/details/:name',
				component: TabsDocsComponent,
				data: {
					title: 'docs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'docs' }
					]
				}
			},
			{
				path: 'docs/new',
				component: NewDocsComponent,
				data: {
					title: 'docs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'docs' }
					]
				}
			},
		]
	}
];
