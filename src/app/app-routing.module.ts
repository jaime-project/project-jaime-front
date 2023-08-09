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
        loadChildren: () => import('./layouts/login/logincomponents.module').then(m => m.LoginComponentsModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/clusters/clustercomponents.module').then(m => m.ClusterComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/modules/modulecomponents.module').then(m => m.ModuleComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/agents/agentcomponents.module').then(m => m.AgentComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/jobs/jobcomponents.module').then(m => m.JobComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/configs/configcomponents.module').then(m => m.ConfigComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/repos/repocomponents.module').then(m => m.RepoComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/servers/servercomponents.module').then(m => m.ServerComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/configs/configcomponents.module').then(m => m.ConfigComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/crons/croncomponents.module').then(m => m.CronComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/messages/messagecomponents.module').then(m => m.MessageComponentsModule)
      },
      {
        path: '',
        loadChildren: () => import('./layouts/hooks/hookcomponents.module').then(m => m.HookComponentsModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
];
