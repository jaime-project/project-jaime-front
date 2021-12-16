import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/servers', pathMatch: 'full' },
      // {
      //   path: '',
      //   loadChildren: () => import('./component/component.module').then(m => m.ComponentModule)
      // },
      {
        path: '',
        loadChildren: () => import('./components/servers/servercomponents.module').then(m => m.ServerComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/modules/modulecomponents.module').then(m => m.ModuleComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/agents/agentcomponents.module').then(m => m.AgentComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/works/workcomponents.module').then(m => m.WorkComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/configs/configcomponents.module').then(m => m.ConfigComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/servers'
  }
];
