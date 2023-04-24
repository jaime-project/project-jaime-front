import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ComponentsModule } from 'src/app/components/components.module';
import { DetailMessageComponent } from './detail/detail.component';
import { ListMessageComponent } from './list/list.component';
import { MessageComponentsRoutes } from './messagecomponents.routing';
import { TabsMessageComponent } from './tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MessageComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    ComponentsModule
  ],
  declarations: [
    DetailMessageComponent,
    ListMessageComponent,
    TabsMessageComponent,
  ]
})
export class MessageComponentsModule { }
