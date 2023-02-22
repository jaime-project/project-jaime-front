import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CodeModuleComponent } from './code/code.component';
import { DetailDocsComponent } from './docs/docs.component';
import { ListModuleComponent } from './list/list.component';
import { MarkdownModuleComponent } from './markdown/markdown.component';
import { ModuleComponentsRoutes } from './modulecomponents.routing';
import { NewModuleComponent } from './new/new.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    CodeModuleComponent,
    ListModuleComponent,
    NewModuleComponent,
    DetailDocsComponent,
    MarkdownModuleComponent
  ]
})
export class ModuleComponentsModule { }
