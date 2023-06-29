import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { LoginRoutes } from './logincomponents.routing';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    NgbModule,
    MonacoEditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SigninComponent
  ]
})
export class LoginComponentsModule { }
