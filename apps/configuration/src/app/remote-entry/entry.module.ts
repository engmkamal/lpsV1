import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormconfigDirective } from './formconfig.directive';
import { MkJsonSchemaFormModule } from '@mk/json-schema-form';
import { MaterialmodulesModule } from '@lps/utils';
import { NgxEditorModule } from 'ngx-editor';

import { AgGridModule } from 'ag-grid-angular';

import { NavigationBarComponent } from '@lps/ui';

import { RemoteEntryComponent } from './entry.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { remoteRoutes } from './entry.routes';
import { ConfighomeComponent } from './components/confighome/confighome.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormfieldsComponent } from './components/formfields/formfields.component';
import { FormwidgetsComponent } from './components/formwidgets/formwidgets.component';

import 'ag-grid-enterprise';
import { FieldrendererComponent } from './components/fieldrenderer/fieldrenderer.component';
import { FormrendererDirective } from './formrenderer.directive';
import { WidgetrendererComponent } from './components/widgetrenderer/widgetrenderer.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { SectionDndListComponent } from './components/section-dnd-list/section-dnd-list.component';
import { ConfigparentComponent } from './components/configparent/configparent.component';
import { CprinitiationhomeComponent } from './components/cprinitiationhome/cprinitiationhome.component';
import { SurveyComponent } from './components/survey/survey.component';

import {MatRadioModule} from '@angular/material/radio';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";

@NgModule({
  declarations: [
    RemoteEntryComponent,
    NxWelcomeComponent,
    ConfighomeComponent,
    FormconfigDirective,
    FormfieldsComponent,
    FormwidgetsComponent,
    FieldrendererComponent,
    FormrendererDirective,
    WidgetrendererComponent,
    SectionDndListComponent,
    CprinitiationhomeComponent,
    SurveyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MkJsonSchemaFormModule,
    MatCheckboxModule,
    MaterialmodulesModule,
    NgxEditorModule,
    AgGridModule,
    NavigationBarComponent,
    DragDropModule,
    RouterModule.forChild(remoteRoutes),
    MatRadioModule,
    ConfigparentComponent,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    }),
  ],
  providers: []
})
export class RemoteEntryModule {}
