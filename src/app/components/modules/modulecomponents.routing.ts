import { Routes } from '@angular/router';
import { CodeModuleComponent } from './code/code.component';
import { DetailDocsComponent } from './docs/docs.component';
import { ListModuleComponent } from './list/list.component';
import { MarkdownModuleComponent } from './markdown/markdown.component';
import { NewModuleComponent } from './new/new.component';


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
				path: 'repos/:repo/modules/details/code/:name',
				component: CodeModuleComponent,
				data: {
					title: 'Modules',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Modules' }
					]
				}
			},
			{
				path: 'repos/:repo/modules/details/docs/:name',
				component: DetailDocsComponent,
				data: {
					title: 'Modules',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Modules' }
					]
				}
			},
			{
				path: 'repos/:repo/modules/details/markdown/:name',
				component: MarkdownModuleComponent,
				data: {
					title: 'Markdown',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Markdown' }
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
