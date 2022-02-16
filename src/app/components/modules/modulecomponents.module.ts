import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DetailModuleComponent } from './detail/detail.component';
import { DetailDocsComponent } from './docs/docs.component';
import { ListModuleComponent } from './list/list.component';
import { ModuleComponentsRoutes } from './modulecomponents.routing';
import { NewModuleComponent } from './new/new.component';
import { TabsModuleComponent } from './tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
  ],
  declarations: [
    DetailModuleComponent,
    ListModuleComponent,
    NewModuleComponent,
    TabsModuleComponent,
    DetailDocsComponent
  ]
})
export class ModuleComponentsModule { }
