import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'cprinitiation',
    loadChildren: () =>
      loadRemoteModule('cprinitiation', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'configuration',
    loadChildren: () =>
      loadRemoteModule('configuration', './Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
