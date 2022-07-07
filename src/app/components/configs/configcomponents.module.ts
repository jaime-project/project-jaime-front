import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ConfigComponentsRoutes } from './configcomponents.routing';
import { RequirementsComponent } from './requirements/requirements.component';
import { TabsConfigComponent } from './tabs/tabs.component';
import { VarConfigComponent } from './vars/var.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule
  ],
  declarations: [
    TabsConfigComponent,
    VarConfigComponent,
    RequirementsComponent
  ]
})
export class ConfigComponentsModule { }
