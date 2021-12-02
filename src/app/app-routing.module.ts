import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/servers', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
      },
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
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
