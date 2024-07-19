import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListStorageComponent } from './list/list.component';
import { StorageComponentsRoutes } from './storagecomponents.routing';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StorageComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    ListStorageComponent,
  ]
})
export class StorageComponentsModule { }
