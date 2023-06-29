import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailRepoComponent } from './detail/detail.component';
import { ListModuleComponent } from './list/list.component';
import { NewRepoComponent } from './new/new.component';
import { RepoComponentsRoutes } from './repocomponents.routing';
import { TabsRepoComponent } from './tabs/tabs.component';
import { YamlRepoComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RepoComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    ListModuleComponent,
    NewRepoComponent,
    TabsRepoComponent,
    YamlRepoComponent,
    DetailRepoComponent
  ]
})
export class RepoComponentsModule { }
