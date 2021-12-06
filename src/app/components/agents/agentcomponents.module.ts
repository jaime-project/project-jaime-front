import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentComponentsRoutes } from './agentcomponents.routing';
import { DetailAgentComponent } from './detail/detail.component';
import { ListAgentComponent } from './list/list.component';
import { TabsAgentComponent } from './tabs/tabs.component';
import { YamlAgentComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AgentComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    DetailAgentComponent,
    ListAgentComponent,
    TabsAgentComponent,
    YamlAgentComponent,
  ]
})
export class AgentComponentsModule { }
