import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { AgentComponentsRoutes } from './agentcomponents.routing';
import { DetailAgentComponent } from './detail/detail.component';
import { ListAgentComponent } from './list/list.component';
import { LogsAgentComponent } from './logs/logs.component';
import { TabsAgentComponent } from './tabs/tabs.component';
import { YamlAgentComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AgentComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ComponentsModule,
    MonacoEditorModule
  ],
  declarations: [
    DetailAgentComponent,
    ListAgentComponent,
    TabsAgentComponent,
    YamlAgentComponent,
    LogsAgentComponent,
  ]
})
export class AgentComponentsModule { }
