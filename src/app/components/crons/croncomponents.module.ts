import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { SharedComponentsModule } from 'src/app/shared/shared.module';
import { CronComponentsRoutes } from './croncomponents.routing';
import { DetailCronComponent } from './detail/detail.component';
import { ListCronComponent } from './list/list.component';
import { NewCronComponent } from './new/new.component';
import { TabsCronComponent } from './tabs/tabs.component';
import { YamlCronComponent } from './yaml/yaml.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CronComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MonacoEditorModule,
    SharedComponentsModule
  ],
  declarations: [
    DetailCronComponent,
    ListCronComponent,
    TabsCronComponent,
    YamlCronComponent,
    NewCronComponent,
  ]
})
export class CronComponentsModule { }
