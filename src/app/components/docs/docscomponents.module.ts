import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { DetailDocsComponent } from './detail/docs.component';
import { DocsComponentsRoutes } from './docscomponents.routing';
import { ListDocsComponent } from './list/list.component';
import { NewDocsComponent } from './new/new.component';
import { TabsDocsComponent } from './tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DocsComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
  ],
  declarations: [
    ListDocsComponent,
    TabsDocsComponent,
    NewDocsComponent,
    DetailDocsComponent
  ]
})
export class DocsComponentsModule { }
