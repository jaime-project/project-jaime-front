import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppModule } from 'src/app/app.module';
import { SharedComponentsModule } from 'src/app/shared/shared.module';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { DetailWorkComponent } from './detail/detail.component';
import { ListWorkComponent } from './list/list.component';
import { LogWorkComponent } from './logs/log.component';
import { NewWorkComponent } from './new/new.component';
import { TabsWorkComponent } from './tabs/tabs.component';
import { WorkComponentsRoutes } from './workcomponents.routing';
import { WorkspaceWorkComponent } from './workspace/workspace.component';
import { YamlWorkComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WorkComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    SharedComponentsModule
  ],
  declarations: [
    DetailWorkComponent,
    ListWorkComponent,
    TabsWorkComponent,
    YamlWorkComponent,
    LogWorkComponent,
    NewWorkComponent,
    WorkspaceWorkComponent,
  ]
})
export class WorkComponentsModule { }
