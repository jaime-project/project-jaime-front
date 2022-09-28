import { Routes } from '@angular/router';
import { AppModule } from './app.module';
import { SigninComponent } from './components/login/signin/signin.component';
import { FullComponent } from './layouts/full/full.component';


export const Approutes: Routes = [
  // {
  //   path: '',
  //   component: AppModule,
  //   children: [
  //     {
  //       path: '',
  //       component: SigninComponent,
  //     },
  //   ]
  // },
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
