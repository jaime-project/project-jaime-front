import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { SharedComponentsModule } from 'src/app/shared/shared.module';
import { DetailServerComponent } from './detail/detail.component';
import { ListServerComponent } from './list/list.component';
import { NewServerComponent } from './new/new.component';
import { ServerComponentsRoutes } from './servercomponents.routing';
import { TabsServerComponent } from './tabs/tabs.component';
import { YamlServerComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ServerComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    SharedComponentsModule
  ],
  declarations: [
    TabsServerComponent,
    YamlServerComponent,
    DetailServerComponent,
    ListServerComponent,
    NewServerComponent
  ]
})
export class ServerComponentsModule { }
