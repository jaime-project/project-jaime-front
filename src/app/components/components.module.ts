import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailAgentComponent } from './agents/detail/detail.component';
import { ListAgentComponent } from './agents/list/list.component';
import { TabsAgentComponent } from './agents/tabs/tabs.component';
import { YamlAgentComponent } from './agents/yaml/yaml.component';
import { ComponentsRoutes } from './components.routing';
import { CodeModuleComponent } from './modules/code/code.component';
import { DocsModuleComponent } from './modules/docs/docs.component';
import { TabsModuleComponent } from './modules/tabs/tabs.component';
import { DetailServerComponent } from './servers/detail/detail.component';
import { ListServerComponent } from './servers/list/list.component';
import { TabsServerComponent } from './servers/tabs/tabs.component';
import { YamlServerComponent } from './servers/yaml/yaml.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    TabsServerComponent,
    YamlServerComponent,
    DetailServerComponent,
    ListServerComponent,
    DetailAgentComponent,
    ListAgentComponent,
    TabsAgentComponent,
    YamlAgentComponent,
    TabsModuleComponent,
    DocsModuleComponent,
    CodeModuleComponent
  ]
})
export class ComponentsModule { }
