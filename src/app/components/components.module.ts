import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbdAccordionBasicComponent } from '../component/accordion/accordion.component';
// import { NgbdAlertBasicComponent } from '../component/alert/alert.component';
// import { NgbdCarouselBasicComponent } from '../component/carousel/carousel.component';
// import { NgbdDatepickerBasicComponent } from '../component/datepicker/datepicker.component';
// import { NgbdDropdownBasicComponent } from '../component/dropdown-collapse/dropdown-collapse.component';
// import { NgbdModalBasicComponent } from '../component/modal/modal.component';
// import { NgbdpaginationBasicComponent } from '../component/pagination/pagination.component';
// import { NgbdPopTooltipComponent } from '../component/popover-tooltip/popover-tooltip.component';
// import { NgbdpregressbarBasicComponent } from '../component/progressbar/progressbar.component';
// import { NgbdratingBasicComponent } from '../component/rating/rating.component';
// import { NgbdtabsBasicComponent } from '../component/tabs/tabs.component';
// import { NgbdtimepickerBasicComponent } from '../component/timepicker/timepicker.component';
import { ComponentsRoutes } from './components.routing';
import { DetailServerComponent } from './servers/detail/detail.component';
import { ListServerComponent } from './servers/list/list.component';
import { TabsServerComponent } from './servers/tabs/tabs.component';
import { YamlServerComponent } from './servers/yaml/yaml.component';
import { DetailAgentComponent } from './agents/detail/detail.component';
import { ListAgentComponent } from './agents/list/list.component';
import { TabsAgentComponent } from './agents/tabs/tabs.component';
import { YamlAgentComponent } from './agents/yaml/yaml.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    // NgbdpregressbarBasicComponent,
    // NgbdpaginationBasicComponent,
    // NgbdAccordionBasicComponent,
    // NgbdAlertBasicComponent,
    // NgbdCarouselBasicComponent,
    // NgbdDatepickerBasicComponent,
    // NgbdDropdownBasicComponent,
    // NgbdModalBasicComponent,
    // NgbdPopTooltipComponent,
    // NgbdratingBasicComponent,
    // NgbdtabsBasicComponent,
    // NgbdtimepickerBasicComponent,
    TabsServerComponent,
    YamlServerComponent,
    DetailServerComponent,
    ListServerComponent,
    DetailAgentComponent,
    ListAgentComponent,
    TabsAgentComponent,
    YamlAgentComponent
  ]
})
export class ComponentsModule { }
