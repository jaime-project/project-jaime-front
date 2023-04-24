import { Routes } from '@angular/router';
import { CodeModuleComponent } from './code/code.component';
import { DetailDocsComponent } from './docs/docs.component';
import { ListModuleComponent } from './list/list.component';
import { MarkdownModuleComponent } from './markdown/markdown.component';
import { NewDocComponent } from './newdoc/newdoc.component';
import { NewMarkdownComponent } from './newmarkdown/newmarkdown.component';
import { NewModuleComponent } from './newmodule/newmodule.component';


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
			{
				path: 'repos/:repo/docs/new',
				component: NewDocComponent,
				data: {
					title: 'Docs',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Docs' }
					]
				}
			},
			{
				path: 'repos/:repo/markdowns/new',
				component: NewMarkdownComponent,
				data: {
					title: 'Markdowns',
					urls: [
						{ title: 'ngComponent' },
						{ title: 'Markdowns' }
					]
				}
			},
		]
	}
];
