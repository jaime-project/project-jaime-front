import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { CardComponent } from './card/card.component';
import { TitleComponent } from './title/title.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    SpinnerComponent,
    CardComponent,
    TitleComponent
  ],
  exports: [
    SpinnerComponent,
    CardComponent,
    TitleComponent
  ]
})
export class ComponentsModule { }
