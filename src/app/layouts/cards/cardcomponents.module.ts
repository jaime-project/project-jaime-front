import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { CardComponentsRoutes } from './cardcomponents.routing';
import { DetailCardComponent } from './detail/detail.component';
import { ListCardComponent } from './list/list.component';
import { NewCardComponent } from './new/new.component';
import { TabsCardComponent } from './tabs/tabs.component';
import { YamlCardComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CardComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    ListCardComponent,
    TabsCardComponent,
    YamlCardComponent,
    DetailCardComponent,
    NewCardComponent
  ]
})
export class CardComponentsModule { }
