import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailHookComponent } from './detail/detail.component';
import { HookComponentsRoutes } from './hookcomponents.routing';
import { ListHookComponent } from './list/list.component';
import { NewHookComponent } from './new/new.component';
import { TabsHookComponent } from './tabs/tabs.component';
import { YamlHookComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HookComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    DetailHookComponent,
    ListHookComponent,
    TabsHookComponent,
    YamlHookComponent,
    NewHookComponent,
  ]
})
export class HookComponentsModule { }
