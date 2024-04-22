/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridAngular } from '@ag-grid-community/angular';

// NOTE: Angular CLI does not support component CSS imports: angular-cli/issues/23273
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  GridOptions,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IDetailCellRendererParams,
  ModuleRegistry,
} from '@ag-grid-community/core';

import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-quartz.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';

import {
    RowGroupingDisplayType,
} from '@ag-grid-community/core';
 


// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    MasterDetailModule,
    MenuModule,
    ColumnsToolPanelModule,
]);


export interface ITablegrid31 {
    autoGroupColumnDef?: any;
    columnDefs?: ColDef;
    components?: any;
    defaultColDef?: any;
    frameworkComponents?: any;
    gridApi?: any;
    gridColumnApi?: any;
    gridOptions?: GridOptions;
    masterGridOptions?: any;
    modules?: any[]; 
    rowData?: any;    
    rowGroupPanelShow?: any;
    sideBar?: any;
    statusBar?: any;
    testData?: any;     
    detailCellRenderer?: any;   
    txtOfQuickSearchInpFld?: any;        
    rowNodeApi?:any;
    masterDetail?: boolean | any;
    rowSelection?:any;
    animateRows?: boolean | any;
    suppressDragLeaveHidesColumns?: boolean;
    groupUseEntireRow?: boolean | any;
    paginationPageSize?: number | any,
    floatingFilter?: boolean | any;
    cacheQuickFilter?: boolean | any;
    enableCharts?: boolean | any;
    enableRangeSelection?: boolean | any;
    suppressRowClickSelection?: boolean | any;
    editType?:any;
    groupDisplayType?: RowGroupingDisplayType | any;
    masterTblData?:any;
    rowHeight?: number | any;
    grid?: any;
}

