import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkComponentsRoutes } from './workcomponents.routing';
import { DetailWorkComponent } from './detail/detail.component';
import { ListWorkComponent } from './list/list.component';
import { TabsWorkComponent } from './tabs/tabs.component';
import { YamlWorkComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WorkComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DetailWorkComponent,
    ListWorkComponent,
    TabsWorkComponent,
    YamlWorkComponent,
  ]
})
export class WorkComponentsModule { }