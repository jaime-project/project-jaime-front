import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { ConfigComponentsRoutes } from './configcomponents.routing';
import { LogsComponent } from './logs/logs.component';
import { ObjectsComponent } from './objects/objects.component';
import { ObjectsGetComponent } from './objectsGet/objectsGet.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { TabsConfigComponent } from './tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule,
    MonacoEditorModule
  ],
  declarations: [
    TabsConfigComponent,
    RequirementsComponent,
    ObjectsComponent,
    ObjectsGetComponent,
    LogsComponent
  ]
})
export class ConfigComponentsModule { }
