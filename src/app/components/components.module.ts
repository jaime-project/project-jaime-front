import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { CardComponent } from './card/card.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TitleComponent } from './title/title.component';
import { CodeComponent } from './code/code.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
  ],
  declarations: [
    SpinnerComponent,
    CardComponent,
    TitleComponent,
    CodeComponent
  ],
  exports: [
    SpinnerComponent,
    CardComponent,
    TitleComponent,
    CodeComponent
  ]
})
export class ComponentsModule { }
