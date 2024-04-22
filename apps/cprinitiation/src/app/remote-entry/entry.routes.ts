import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ConfighomeComponent } from './components/confighome/confighome.component';
import { FormfieldsComponent } from './components/formfields/formfields.component';
import { FieldrendererComponent } from './components/fieldrenderer/fieldrenderer.component';
import { FormwidgetsComponent } from './components/formwidgets/formwidgets.component';
import { MasterdetailsrendererComponent } from './components/masterdetailsrenderer/masterdetailsrenderer.component';
import { CprinitiationhomeComponent } from './components/cprinitiationhome/cprinitiationhome.component';
import { cprinithomeResolver } from '@lps/cpr';


export const remoteRoutes: Route[] = [  
  { 
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: ':section',
        component: CprinitiationhomeComponent,
        //resolve: { masterTemplet: cprinithomeResolver }
      },
      {
        path: 'preinfo',
        component: CprinitiationhomeComponent
        //component: ConfighomeComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: 'formfields',
        component: FormfieldsComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: 'fieldrenderer',
        component: FieldrendererComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: 'formwidgets',
        component: FormwidgetsComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      { 
        path: 'masterdetails', 
        component: MasterdetailsrendererComponent
      },
      {
        path: '',
        redirectTo: 'preinfo',
        pathMatch: 'full'
      }
    ]
  },
];
