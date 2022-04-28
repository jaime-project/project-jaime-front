import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/clusters', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./components/clusters/clustercomponents.module').then(m => m.ClusterComponentsModule)
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
      {
        path: '',
        loadChildren: () => import('./components/repos/repocomponents.module').then(m => m.RepoComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/servers/servercomponents.module').then(m => m.ServerComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/clusters'
  }
];
