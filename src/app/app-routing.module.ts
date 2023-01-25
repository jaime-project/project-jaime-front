import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./components/login/logincomponents.module').then(m => m.LoginComponentsModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
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
        loadChildren: () => import('./components/jobs/jobcomponents.module').then(m => m.JobComponentsModule)
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
      {
        path: '',
        loadChildren: () => import('./components/configs/configcomponents.module').then(m => m.ConfigComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./components/crons/croncomponents.module').then(m => m.CronComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
