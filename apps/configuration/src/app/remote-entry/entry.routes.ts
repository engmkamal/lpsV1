import { Route } from '@angular/router';
import { RemoteEntryComponent } from './entry.component';
import { ConfighomeComponent } from './components/confighome/confighome.component';
import { FormfieldsComponent } from './components/formfields/formfields.component';
import { FieldrendererComponent } from './components/fieldrenderer/fieldrenderer.component';
import { FormwidgetsComponent } from './components/formwidgets/formwidgets.component';
import { CprinitiationhomeComponent } from './components/cprinitiationhome/cprinitiationhome.component';
import { SurveyComponent } from './components/survey/survey.component';
import { formfieldResolver } from '../resolver/formfield.resolver';

export const remoteRoutes: Route[] = [  
  { 
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: 'confighome',
        component: ConfighomeComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: 'formfields',
        component: FormfieldsComponent,
        resolve: { formfields: formfieldResolver },
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
      },//CprinitiationhomeComponent
      {
        path: 'cprinitiationhome',
        component: CprinitiationhomeComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: 'survey',
        component: SurveyComponent,
        // loadChildren: () =>
        //   import('./cpr-initiation/cpr-initiation.component').then((m) => m.CprInitiationComponent),
      },
      {
        path: '',
        redirectTo: 'confighome',
        pathMatch: 'full'
      }
    ]
  },
];
