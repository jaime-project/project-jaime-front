import { Routes } from '@angular/router';

import { NgbdpregressbarBasicComponent } from './progressbar/progressbar.component';
import { NgbdpaginationBasicComponent } from './pagination/pagination.component';
import { NgbdAccordionBasicComponent } from './accordion/accordion.component';
import { NgbdAlertBasicComponent } from './alert/alert.component';
import { NgbdCarouselBasicComponent } from './carousel/carousel.component';
import { NgbdDatepickerBasicComponent } from './datepicker/datepicker.component';
import { NgbdDropdownBasicComponent } from './dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from './modal/modal.component';
import { NgbdPopTooltipComponent } from './popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponent } from './rating/rating.component';
import { NgbdtabsBasicComponent } from './tabs/tabs.component';
import { NgbdtimepickerBasicComponent } from './timepicker/timepicker.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './card/card.component';
import { ToastComponent } from './toast/toast.component';

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
				component: NgbdModalBasicComponent,
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
