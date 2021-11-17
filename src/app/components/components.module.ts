import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ComponentsRoutes } from './components.routing';
import { TabsServerComponent } from './servers/tabs/tabs.component';
import { NewServerComponent } from './servers/new/new.component';
import { DetailServerComponent } from './servers/detail/detail.component';
import { NgbdtabsBasicComponent } from '../component/tabs/tabs.component';
import { NgbdpregressbarBasicComponent } from '../component/progressbar/progressbar.component';
import { NgbdpaginationBasicComponent } from '../component/pagination/pagination.component';
import { NgbdAccordionBasicComponent } from '../component/accordion/accordion.component';
import { NgbdAlertBasicComponent } from '../component/alert/alert.component';
import { NgbdCarouselBasicComponent } from '../component/carousel/carousel.component';
import { NgbdDatepickerBasicComponent } from '../component/datepicker/datepicker.component';
import { NgbdDropdownBasicComponent } from '../component/dropdown-collapse/dropdown-collapse.component';
import { NgbdModalBasicComponent } from '../component/modal/modal.component';
import { NgbdPopTooltipComponent } from '../component/popover-tooltip/popover-tooltip.component';
import { NgbdratingBasicComponent } from '../component/rating/rating.component';
import { NgbdtimepickerBasicComponent } from '../component/timepicker/timepicker.component';
import { ListServerComponent } from './servers/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    NgbdpregressbarBasicComponent,
    NgbdpaginationBasicComponent,
    NgbdAccordionBasicComponent,
    NgbdAlertBasicComponent,
    NgbdCarouselBasicComponent,
    NgbdDatepickerBasicComponent,
    NgbdDropdownBasicComponent,
    NgbdModalBasicComponent,
    NgbdPopTooltipComponent,
    NgbdratingBasicComponent,
    NgbdtabsBasicComponent,
    NgbdtimepickerBasicComponent,
    TabsServerComponent,
    NewServerComponent,
    DetailServerComponent,
    ListServerComponent
  ]
})
export class ComponentsModule { }
