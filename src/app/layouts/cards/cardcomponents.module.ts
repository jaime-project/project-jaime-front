import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ComponentsModule } from 'src/app/components/components.module';
import { CardComponentsRoutes } from './cardcomponents.routing';
import { ListCardComponent } from './list/list.component';


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
  ]
})
export class CardComponentsModule { }
