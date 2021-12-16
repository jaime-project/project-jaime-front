import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfigComponentsRoutes } from './configcomponents.routing';
import { TabsConfigComponent } from './tabs/tabs.component';
import { VarConfigComponent } from './vars/var.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    TabsConfigComponent,
    VarConfigComponent
  ]
})
export class ConfigComponentsModule { }
