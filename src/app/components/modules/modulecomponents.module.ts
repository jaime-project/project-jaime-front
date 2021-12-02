import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CodeModuleComponent } from './code/code.component';
import { DocsModuleComponent } from './docs/docs.component';
import { ListModuleComponent } from './list/list.component';
import { ModuleComponentsRoutes } from './modulecomponents.routing';
import { NewCodeModuleComponent } from './newcode/newcode.component';
import { NewDocsModuleComponent } from './newdocs/newdocs.component';
import { NewTabsModuleComponent } from './newtabs/newtabs.component';
import { TabsModuleComponent } from './tabs/tabs.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ModuleComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    CodeModuleComponent,
    DocsModuleComponent,
    ListModuleComponent,
    NewCodeModuleComponent,
    NewDocsModuleComponent,
    NewTabsModuleComponent,
    TabsModuleComponent,
  ]
})
export class ModuleComponentsModule { }
