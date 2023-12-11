import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailLibraryComponent } from './detail/detail.component';
import { LibraryComponentsRoutes } from './librarycomponents.routing';
import { ListLibraryComponent } from './list/list.component';
import { NewLibraryComponent } from './new/new.component';
import { TabsLibraryComponent } from './tabs/tabs.component';
import { YamlLibraryComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LibraryComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    ListLibraryComponent,
    TabsLibraryComponent,
    YamlLibraryComponent,
    DetailLibraryComponent,
    NewLibraryComponent
  ]
})
export class LibraryComponentsModule { }
