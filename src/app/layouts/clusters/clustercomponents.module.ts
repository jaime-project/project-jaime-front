import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { ClusterComponentsRoutes } from './clustercomponents.routing';
import { DetailClusterComponent } from './detail/detail.component';
import { ListClusterComponent } from './list/list.component';
import { NewClusterComponent } from './new/new.component';
import { TabsClusterComponent } from './tabs/tabs.component';
import { YamlClusterComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClusterComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    TabsClusterComponent,
    YamlClusterComponent,
    DetailClusterComponent,
    ListClusterComponent,
    NewClusterComponent
  ]
})
export class ClusterComponentsModule { }
