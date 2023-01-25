import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { SharedComponentsModule } from 'src/app/shared/shared.module';
import { DetailJobComponent } from './detail/detail.component';
import { JobsComponentsRoutes } from './jobcomponents.routing';
import { ListJobComponent } from './list/list.component';
import { LogJobComponent } from './logs/log.component';
import { NewJobComponent } from './new/new.component';
import { TabsJobComponent } from './tabs/tabs.component';
import { WorkspaceJobComponent } from './workspace/workspace.component';
import { YamlJobComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(JobsComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    SharedComponentsModule
  ],
  declarations: [
    DetailJobComponent,
    ListJobComponent,
    TabsJobComponent,
    YamlJobComponent,
    LogJobComponent,
    NewJobComponent,
    WorkspaceJobComponent,
  ]
})
export class JobComponentsModule { }
