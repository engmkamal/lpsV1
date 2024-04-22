import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormconfigDirective } from './formconfig.directive';
import { MkJsonSchemaFormModule } from '@mk/json-schema-form';
import { MaterialmodulesModule } from '@lps/utils';
import { NgxEditorModule } from 'ngx-editor';

import { AgGridModule } from 'ag-grid-angular';

import { DragAccordionCardComponent, NavigationBarComponent } from '@lps/ui';

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

import {DragDropModule, CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';




//==================
// import { TextFieldModule } from '@angular/cdk/text-field';
// import { ContentLoaderModule } from '@ngneat/content-loader';
// import { NzDrawerModule } from 'ng-zorro-antd/drawer';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzModalModule } from 'ng-zorro-antd/modal';
// import { NzNotificationModule } from 'ng-zorro-antd/notification';
// import { NzPopoverModule } from 'ng-zorro-antd/popover';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
// import { QuillModule } from 'ngx-quill';
import { MasterdetailsrendererComponent } from './components/masterdetailsrenderer/masterdetailsrenderer.component';

import { SectionrendererComponent } from './components/sectionrenderer/sectionrenderer.component';
import { CprinitiationhomeComponent } from './components/cprinitiationhome/cprinitiationhome.component';

//========= for loader ===============
import { NgxLoadingModule } from 'ngx-loading';
import { ngxLoadingAnimationTypes } from 'ngx-loading';


@NgModule({
  declarations: [
    RemoteEntryComponent,
    NxWelcomeComponent,
    CprinitiationhomeComponent,
    ConfighomeComponent,
    FormconfigDirective,
    FormfieldsComponent,
    FormwidgetsComponent,
    FieldrendererComponent,
    FormrendererDirective,
    WidgetrendererComponent,
    MasterdetailsrendererComponent,
    SectionrendererComponent
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
    //============    
    // NzIconModule.forChild(NZ_JIRA_ICONS),
    // NzToolTipModule,
    // NzModalModule,
    // NzDropDownModule,
    // NzSelectModule,
    // NzNotificationModule,
    // NzDrawerModule,
    // NzPopoverModule,
    // TextFieldModule,
    // JiraControlModule,
    // ContentLoaderModule,
    // QuillModule,
    RouterModule.forChild(remoteRoutes),
    JsonPipe,
    DragAccordionCardComponent,
    CdkDrag, 
    CdkDragHandle,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: false,
    })
  ],
  exports:[],
  providers: [],
})
export class RemoteEntryModule {}