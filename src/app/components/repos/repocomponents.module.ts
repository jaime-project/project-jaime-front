import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ListModuleComponent } from './list/list.component';
import { RepoComponentsRoutes } from './repocomponents.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RepoComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
  ],
  declarations: [
    ListModuleComponent,
  ]
})
export class RepoComponentsModule { }
