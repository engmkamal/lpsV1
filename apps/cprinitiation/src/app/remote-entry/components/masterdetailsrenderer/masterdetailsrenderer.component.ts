/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit, ViewChild, Renderer2, AfterViewInit, AfterViewChecked, EventEmitter, Inject } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular';
import { 
  CellClickedEvent, 
  ColDef,
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ICellEditorParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
  DndSourceOnRowDragParams,
  GridReadyEvent,
  RowDropZoneParams,
  IDetailCellRendererParams, 
  ICellRendererParams
} from 'ag-grid-community';

import { 
  Tablegrid, 
  ColumnDefinitionComponent 
} from '@lps/utils';

//========to covert promise to observer======
import {
  from,
  forkJoin,
  combineLatest,
  Observable,
  Subscription,
  retry, 
  catchError,
  throwError,
  of,
  map,
  Subject
} from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

import { SharepointlistService } from '@lps/service';
//import { FieldrendererComponent } from '../fieldrenderer/fieldrenderer.component';
import { ConfighomeComponent } from '../confighome/confighome.component';
import { Schema, State } from '@mk/json-schema-form';
import { WidgetrendererComponent } from '../widgetrenderer/widgetrenderer.component';




declare let webkitSpeechRecognition: any; // for voice recognition

function actionCellRenderer(params:any) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell:any) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
      <button  class="action-button update"  data-action="update"> Update  </button>
      <button  class="action-button cancel"  data-action="cancel" > Cancel </button>
      `;
  } else {
    eGui.innerHTML = `
      <button class="action-button pick" data-action="pick" > Pick  </button>
      <button class="action-button edit" data-action="edit" > Edit  </button>
      <button class="action-button delete" data-action="delete" > Delete </button>
      `;
  }

  return eGui;
}

@Component({
  selector: 'lps-masterdetailsrenderer.component',
  templateUrl: './masterdetailsrenderer.component.html',
  styleUrl: './masterdetailsrenderer.component.scss',
})
export class MasterdetailsrendererComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;
  rowData$!: Observable<any[]>;

    siteAbsoluteUrl = window.location.origin;
    mpTG = new Tablegrid();
    rowData: any = [];

    // rowData: any = [      
    //   {
    //     id: 1,
    //     control: "cif",
    //     name: "CIF",
    //     schema: { 
    //       type: "string" 
    //     },
    //     value:"test"        
    //   },
    //   {
    //     id: 2,
    //     control: "test",
    //     name: "test",
    //     schema: { 
    //       type: "integer" 
    //     },
    //     value:5
    //   },
    //   {
    //     id: 3,
    //     control: "test",
    //     name: "test",
    //     schema: { 
    //       type: "number" 
    //     },
    //     value:3.1414
    //   }
    // ];

    // rowDataSelect: any = [      
    //   {
    //     id: 1,
    //     control: "CustomerType",
    //     name: "CustomerType",
    //     schema: { 
    //       "type": "string",
    //       "widget": "select",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET" 
    //     },
    //     value:"France"        
    //   },
    //   {
    //     id: 2,
    //     control: "LeagalEntity",
    //     name: "LeagalEntity",
    //     schema: { 
    //       "type": "string",
    //       "widget": "select",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET" 
    //     },
    //     value:"China"        
    //   }
    // ];

    // rowDataRadio: any = [      
    //   {
    //     id: 1,
    //     control: "CustomerType",
    //     name: "CustomerType",
    //     schema: { 
    //       "type": "string",
    //       "widget": "radio",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET" 
    //     },
    //     value:"France"        
    //   },
    //   {
    //     id: 2,
    //     control: "LeagalEntity",
    //     name: "LeagalEntity",
    //     schema: { 
    //       "type": "string",
    //       "widget": "radio",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET" 
    //     },
    //     value:"China"        
    //   }
    // ];

    // rowDataMultiSelect: any = [  
    //   {
    //     id: 1,
    //     control: "ProposalType",
    //     name: "ProposalType",
    //     schema: { 
    //       "type": "array",
    //       "layout": "select",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET",
    //       "items": {
    //         "type": "string"
    //       }
    //     },
    //     value:[
    //       "India",
    //       "China"
    //     ]        
    //   },
    //   {
    //     id: 2,
    //     control: "ProposalType2",
    //     name: "ProposalType2",
    //     schema: { 
    //       "type": "array",
    //       "layout": "select",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET",
    //       "items": {
    //         "type": "string"
    //       }
    //     },
    //     value:[
    //       "India",
    //       "China"
    //     ]        
    //   },
    //   {
    //     id: 3,
    //     control: "ProposalType3",
    //     name: "ProposalType3",
    //     schema: { 
    //       "type": "array",
    //       "layout": "select",
    //       "choicesUrl": "/assets/autocomplete-simple.json",
    //       "choicesVerb": "GET",
    //       "items": {
    //         "type": "string"
    //       }
    //     },
    //     value:[
    //       "India",
    //       "China"
    //     ]        
    //   }
    // ];

    // rowDataDate: any = [  
    //   {
    //     id: 1,
    //     control: "formatted",
    //     name: "Formatted Date",
    //     schema: { 
    //       "type": "string",
    //       "widget": "date",
    //       "dateFormat": "MM/dd/yyyy"
    //     },
    //     value:"12/18/2020"        
    //   },
    //   {
    //     id: 2,
    //     control: "ISO8601",
    //     name: "ISO8601",
    //     schema: { 
    //       "type": "string",
    //       "widget": "date"
    //     },
    //     value:"2020-10-14T00:00:00.000Z"       
    //   },
    //   {
    //     id: 3,
    //     control: "millisecs",
    //     name: "millisecs",
    //     schema: { 
    //       "type": "integer",
    //       "widget": "date"
    //     },
    //     value:0        
    //   }
    // ];

    widgetList:any[] = [
      {
        id: 1,
        control: "LoanType",
        name: "LoanType",
        schema: {
          "type": "string",
          "widget": "radio",
          "choicesUrl": "/assets/loanType.json",
          "choicesVerb": "GET"
        },
        value:"New"        
      },
      {
        id: 2,
        control: "CopyCPR",
        name: "CopyCPR",
        schema: { 
          type: "string" 
        },
        value:"test"        
      },
      // {
      //   id: 3,
      //   control: "ProposalType",
      //   name: "ProposalType",
      //   schema: {
      //     "type": "object",
      //     "properties": {
      //       "Take-Over": {
      //         "type": "boolean"
      //       },
      //       "Top-Up": {
      //         "type": "boolean"
      //       },
      //       "Renewal": {
      //         "type": "boolean"
      //       },
      //       "Enhancement": {
      //         "type": "boolean"
      //       },
      //       "Reduction": {
      //         "type": "boolean"
      //       },
      //       "Restructure": {
      //         "type": "boolean"
      //       }
      //     }
      //   },
      //   value:{
      //     "Take-Over": true,
      //     "Top-Up": false,
      //     "Renewal": true,
      //     "Enhancement": true,
      //     "Reduction": false,
      //     "Restructure": true
      //   }        
      // },
      {
        id: 4,
        control: "CustomerType",
        name: "CustomerType",
        schema: {
          "type": "string",
          "widget": "select",
          "choicesUrl": "/assets/customerTypes.json",
          "choicesVerb": "GET"
        },
        value:"Individual"        
      },
      // {
      //   id: 5,
      //   control: "LegalEntity",
      //   name: "LegalEntity",
      //   schema: {
      //     "type": "string",
      //     "widget": "select",
      //     "choicesUrl": "/assets/autocomplete-simple.json",
      //     "choicesVerb": "GET"
      //   },
      //   value:"France"        
      // },
      {
        id: 5,
        control: "cif",
        name: "CIF",
        schema: { 
          type: "string" 
        },
        value:"test"        
      },
      // {
      //   id: 1,
      //   control: "array",
      //   name: "array",
      //   schema: {
      //     "type": "array",
      //     "items": {
      //       "type": "string"
      //     }
      //   },
      //   value:[
      //     "a",
      //     "b"
      //   ]        
      // },
      {
        id: 7,
        control: "ApprovalAuthority",
        name: "ApprovalAuthority",
        schema: {
          "type": "string",
          "widget": "radio",
          "choicesUrl": "/assets/approvalAuthority.json",
          "choicesVerb": "GET"
        },
        value:"WithinBranch"        
      }
  
    ];

    public txtOfQuickSearchInpFld:any;
    //public rowHeight:any;

    //=========for infinite scrolling and lazy loading start=========
    rowBuffer:any;
    cacheOverflowSize:any;
    maxConcurrentDatasourceRequests:any;
    infiniteInitialRowCount:any;
    maxBlocksInCache:any;
    components:any;
  
    private onGridReadyParamsApi:any;
  
    private dbTagUrlInfo ={ 
      titleTag: '',
      urlVoice : '',
      qryStrKeyVal: '',
      qryStrKeyTyp: 'GUID',
      mode1: '',
      mode2: ''
    }
  
    dashboardsListsInfo:any;
  
    @ViewChild('filterTextBox') filterTextBox:any;

    elementRenderer!:any;

    updatedata!:any;

    parentEmitter = new EventEmitter<string>();
    message!: string; 

    httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json; odata=verbose",
        "Content-Type": "application/json; odata=verbose",
        "X-HTTP-Method": "MERGE",
        'IF-MATCH': "*"
      }),
    };

    rowDragEntireRow = true;

    private clickedDashboardInfo = { 
      wfName: '',
      acessPermission: "Unauthorized",
      listIndex: 0,
      serviceFnName: 'fetchListItemWithExpStFilOrd',
      config: {},
      mapedData: {d:[]},
      recMstLocDat: {d:[]}
    };

    private listInfo = {  
      name: "",
      query: "",
      expand: "",
      select: "",
      filter: "",
      orderByPrm: "",
      orderByVal: false,
      top: 20,
    };

    private cGui!:HTMLDivElement;

    fldCategory = "widgetColDef";

    constructor(
      private httpClient: HttpClient,
      private _actRoute: ActivatedRoute,
      elRenderer: Renderer2,
      private sharepointlistService: SharepointlistService,
      //@Inject('cGui') cGui: HTMLDivElement
      ) { 
        this.elementRenderer = elRenderer;
        //this.cGui = cGui; 
      }



      async executeOnInitProcesses(){    
        try{
          await this.checkAuthorization();
          await this.dashboardGridDef();
          await this.actionBtnColDef();
          //await this.createColDef(this.clickedDashboardInfo);
          await this.jsonSchemaColDef();
          await this.rendererComColDef();
          //await this.getRowData(this.clickedDashboardInfo);
          this.rowData = this.widgetList;
        } 
        catch(err){
          console.log("Error: " + err)
        }
      }


    async ngOnInit() {
      //const dbListsInfoUrl = "https://portal.bergerbd.com/Style Library/Dashboard/V1/assets/dashboardslistsinfo.ts";
      const dbListsInfoUrl = "http://localhost:4202/assets/widgetColDefJson.ts";
      this.httpClient.get(dbListsInfoUrl).subscribe(data =>{
        this.dashboardsListsInfo = data;
        if(this.dashboardsListsInfo.length >0){
          this.executeOnInitProcesses();   
        }else{
          alert("Fetching List info failed !");
        }
      });

      //==================for online dummy data ================
      // this.rowData$ = this.httpClient
      //   .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
        
    }

    onGridReady(params:any, gridName?:string) {

      this.mpTG.gridApi = params.api;
      this.mpTG.gridColumnApi = params.columnApi;
  
      //======= late loading with all row data start ====
      this.listInfo.top = 200000;    
  
      //this.getGridReadyprocesses();
      
      this.onGridReadyParamsApi = this.mpTG.gridApi; //for voice recognition 
      
      //====for editing ===
      
      this.mpTG.rowNodeApi = params.rowNodeApi;
      this.mpTG.editType = 'fullRow';

      this.setRowHeight(125);

      this.addDropZones(params);
      
    }

    //=======step-1
    async checkAuthorization(){ 
      return new Promise((resolve, reject)=>{
        this._actRoute.paramMap.subscribe((url:any) => {
          //const wfName = url.get('id');
          const wfName = this.fldCategory;
          if (wfName) { 
            this.clickedDashboardInfo.wfName = wfName;          
            this.clickedDashboardInfo.listIndex = this.dashboardsListsInfo.findIndex((item:any) => item.WfName === wfName);
            const wfIndex = this.clickedDashboardInfo.listIndex;
            // # pushing clickedDashboardInfo from 'this.dashboardsListsInfo' file to in memory #
            this.clickedDashboardInfo.config = this.dashboardsListsInfo[wfIndex]; 
            resolve(this.clickedDashboardInfo);
          }
          else{
            alert("Workflow Name not found !");
            reject();
            return false;
          }
          return this.clickedDashboardInfo;
        });


      })

    
      
    }

    //====step 2==
    dashboardGridDef(){   
      return new Promise((resolve, reject)=>{
        this.mpTG.columnDefs = [];
        //=============set column definition start ===========
        this.mpTG.defaultColDef = {
          flex: 1,
          minWidth: 50,
          resizable: true, //to resize; add resizable: false to any individual column to disable resizingng that col only
          enableValue: true,
          enableRowGroup: true,
          enablePivot: true,
          sortable: true,
          filter: true,
          editable: true,
        };

 
       
        //--------for action btn link rendering start -------
        this.mpTG.rowGroupPanelShow = 'always';

        //=========for setting features on every subgroup items start=======
        // this.mpTG.autoGroupColumnDef = {
        //   headerName: 'Group',
        //   field: 'RequestStatus',
        //   minWidth: 30,
        //   cellRenderer: 'agGroupCellRenderer',
        //   cellRendererParams: {
        //     //  checkbox: true
        //   },
        // };
        //------------ subitem fetures ends -----------
        this.mpTG.rowHeight = 100;  
        this.mpTG.masterDetail = true;
        this.mpTG.rowSelection = "multiple";
        this.mpTG.animateRows = true;
        this.mpTG.suppressDragLeaveHidesColumns = true;
        this.mpTG.groupUseEntireRow = true;
        this.mpTG.paginationPageSize = 1000;
        this.mpTG.floatingFilter = true;
        this.mpTG.cacheQuickFilter = true;
        this.mpTG.enableCharts = true;
        this.mpTG.enableRangeSelection = true;
        this.mpTG.suppressRowClickSelection = true;

        //this.mpTG.detailCellRendererParams = MasterdetailsrendererComponent;
        //this.mpTG.frameworkComponents = { myDetailCellRenderer: MasterdetailsrendererComponent };
         
        this.mpTG.components = {
          loadingRenderer: function (params:any) {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return "<img src=\"https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/images/loading.gif\">";
            }
          },
          'fieldrenderer': WidgetrendererComponent
        };

        this.mpTG.detailCellRendererParams = {
          detailGridOptions: {
            columnDefs: [
              {
                headerName: 'Widget View',
                field: 'schema', 
                // cellRendererSelector: (params: ICellRendererParams) => {
                //   if(params.data.schema.type !=null){
                //     return {
                //       component: WidgetrendererComponent,
                //       params: {
                //         data: params.data 
                //       }
                //     }
                //   }
                //   else{
                //     return `<div> Invalid Schema !</div>`; 
                //   }
                // },
                // cellRenderer: (params:any)=> {
                //   return `<div><Button class="action-button edit" data-action="edit" variant="outlined" color="primary" (click)="pickUp(params.data)" style="height:30px; border:1px solid grey; padding: 5px;">Pick Up</Button></div>`;
                // },                
                //field: el.field,            
                // sortable: true,
                // enableRowGroup: true,
                // filter: 'agSetColumnFilter',
                // filterParams: {
                //     resetButton: true,
                // },
                minWidth: 550, 
                maxWidth: 580,
                menuTabs: [],
                // editable: el.editable,
                // cellEditor: 'agTextCellEditor',
                // cellClass: "ag-header-group-cell-label",
                // cellStyle: function (params:any) {
                //     if (params.value != '') {
                //     return {
                //         textAlign: 'center',
                //         display: 'flex',
                //     };
                //     } else {
                //     return {
                //         textAlign: 'center',
                //     }
                //     }
                // },
                //rowGroup: (el.rowGroup == 'undefined')? false: el.rowGroup,
              },              
              { field: 'direction' }              
            ],
            defaultColDef: {
              flex: 1,
            },
          },
          getDetailRowData: (params) => {
            params.successCallback(params.data.direction);
          },
        } as IDetailCellRendererParams<any, any>;
        //-------------col def ends -------------------
        resolve(this.mpTG);
      }) 
      
      
    }

    //==== step3 ==
    createColDef(i:any) {

      const htmlEleRenderer = this.elementRenderer;
  
      return new Promise((resolve, reject)=>{    
      
          this.dashboardsListsInfo[i.listIndex].DbViewColDef.forEach((element:any, index:number ) => {
            
            const ftype = element.fldType;
            const eGui: HTMLDivElement = htmlEleRenderer.createElement('div');          
            const mpTgColDef = new ColumnDefinitionComponent(i, element, eGui);    
            return this.mpTG.columnDefs.push(mpTgColDef.fieldMapper(element));          
      
          });
  
          resolve(this.mpTG.columnDefs);
  
      })    
    }

    //==== step4 ==
    rendererComColDef() {

      const compRenrerFld = {
        headerName: "Widget View",
        // cellRenderer: (params:any)=> {
        //   return `<div><Button class="action-button edit" data-action="edit" variant="outlined" color="primary" (click)="pickUp(params.data)" style="height:30px; border:1px solid grey; padding: 5px;">Pick Up</Button></div>`;
        // },
        cellRenderer: WidgetrendererComponent, //FieldrendererComponent, //ConfighomeComponent,
        
        // cellRendererParams: {
        //   currency: 'EUR'
        // }
        minWidth: 550, 
        maxWidth: 580,
        menuTabs: [],
        // editable: el.editable,
        // cellEditor: 'agTextCellEditor',
        // cellClass: "ag-header-group-cell-label",
        // cellStyle: function (params:any) {
        //     if (params.value != '') {
        //     return {
        //         textAlign: 'center',
        //         display: 'flex',
        //     };
        //     } else {
        //     return {
        //         textAlign: 'center',
        //     }
        //     }
        // },
        //rowGroup: (el.rowGroup == 'undefined')? false: el.rowGroup,
      }
  
      return new Promise((resolve, reject)=>{ 
            
        this.mpTG.columnDefs.push(compRenrerFld);  
        resolve(this.mpTG.columnDefs);
  
      })    
    }

    //==== step3/1 ==
    jsonSchemaColDef() {

      const jsonSchemaFld = {
        headerName: "Widget Templet",
        cellRenderer: (params:any)=> {
          let jsonParams = JSON.stringify(params.data);
          return `<pre> ${jsonParams} </pre>`;
        },
        minWidth: 350, 
        maxWidth: 380,
        menuTabs: []
      }
  
      return new Promise((resolve, reject)=>{ 
            
        this.mpTG.columnDefs.push(jsonSchemaFld);  
        resolve(this.mpTG.columnDefs);
  
      })    
    }

    //==== step0 ==
    actionBtnColDef() {

      const checkboxFld ={
        colId: 'checkbox',
        maxWidth: 50,
        checkboxSelection: true,
        suppressMenu: true,
        headerCheckboxSelection: true,
        editable: false,
      }

      const dndActionFld = {
        colId: 'dragDrop',
        dndSource: true,
        //dndSourceOnRowDrag: this.onRowDrag,
        rowDrag: true,
        minWidth: 50, 
        maxWidth: 60,
        editable: false,
        //menuTabs: ['filterMenuTab', 'generalMenuTab']        
      }



      const masterDetailIcnFld ={
        //headerName: "masterDetail",
        colId: 'masterDetail',
        cellRenderer: 'agGroupCellRenderer',
        minWidth: 50, 
        maxWidth: 80
      }

      const pickBtnFld ={
        headerName: "Action",
        colId: 'ID',
        checkboxSelection: false,
        suppressMenu: false,
        headerCheckboxSelection: false,
        cellRenderer: actionCellRenderer,
        minWidth: 150, 
        maxWidth: 180,
        editable: false,
      }
  
      return new Promise((resolve, reject)=>{ 
            
        this.mpTG.columnDefs.push(checkboxFld); 
        this.mpTG.columnDefs.push(dndActionFld);
        this.mpTG.columnDefs.push(masterDetailIcnFld);
        this.mpTG.columnDefs.push(pickBtnFld);
         
        resolve(this.mpTG.columnDefs);
  
      })    
    }

    actionBtnFldColDef(el?:any) {

      const vwLnkFld = {
        headerName: "Action",
        field: 'id',
        cellRenderer: (params:any)=> {
            const editingCells = params.api.getEditingCells();
            const isCurrentRowEditing = editingCells.some((cell:any) => {
            return cell.rowIndex === params.node.rowIndex;
            });
        
            if (isCurrentRowEditing) {
            this.cGui.innerHTML = `
                <a  class="action-button update"  data-action="update" style="margin: 0px; padding: 0px 5px; font-size: 14px; color: blue; cursor:pointer" onmouseover="this.style.color='green'" onmouseout="this.style.color='blue'" > Update  </a>
                <a  class="action-button cancel"  data-action="cancel" style="margin: 0px; padding: 0px 5px; font-size: 14px; color: blue; cursor:pointer" onmouseover="this.style.color='red'" onmouseout="this.style.color='blue'" > Cancel </a>
                `;
            } else {
                this.cGui.innerHTML = `                    
                <Button class="action-button edit" data-action="edit" variant="outlined" color="primary" (click)="handleUpdate(params.data)" style="height:20px;">Edit</Button>
                <Button class="action-button delete" data-action="delete" variant="outlined" color="secondary" style="height:20px;">Delete</Button>                    
                `;
            }
            return this.cGui;
        },           
        enableRowGroup: false,
        menuTabs: [],
        editable: false,
        cellClass: "ag-header-group-cell-label",
        cellStyle: function (params:any) {
            if (params.value != '') {
            return {
                textAlign: 'center',
                display: 'flex',
            };
            } else {
            return {
                textAlign: 'center',
            }
            }
        },
        minWidth: 100, 
        maxWidth: 150,
      }

      return new Promise((resolve, reject)=>{ 
            
        this.mpTG.columnDefs.push(vwLnkFld);  
        resolve(this.mpTG.columnDefs);
  
      })
    }

    //==== step 5 ==
    async getRowData(i:any) {
    
      const mstListname = i.config.MasterListInfo.name;
      const mstSelQry = i.config.MasterListInfo.select;
  
      //let mstApiUrl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('" + mstListname + "')/items?&$top=2000000&$select=" + mstSelQry + "";
      //let detApiUrl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('" + detListname + "')/items?&$top=2000000&$select=" + detSelQry + "";
      
      const mstApiUrl = "https://enadocreport.com/api/Report?type=View%20Report&user=All";
  
      return new Promise((resolve, reject)=>{ 
        try {
          //==========implementing forkJoin ============
          from(forkJoin({
            masterTbl: this.httpClient.get<any[]>(mstApiUrl)
          }))
          .subscribe(({masterTbl}) => {               
            const mstTblDta = (JSON.parse(JSON.stringify(masterTbl))).value;      
            this.rowData = mstTblDta;              
            resolve(this.rowData);
          });
          //----------- forkJoin ends -------
          
        } catch (e) {
          reject(e);
          console.log(e);
        }
  
      })
    }

      //===================== Export Table data to Excel start ==============
  onBtnExportDataAsExcel() {
    function rowGroupCallback(params:any) {
      return params.node.key;
    }

    this.mpTG.gridApi.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }
  //===================== Export Table data to Excel end ==============

  //=============== Quick central filter function start ========== 
  //--------method-1: (with angular)--------
  quickSearch() {
    this.mpTG.gridApi.setQuickFilter(this.txtOfQuickSearchInpFld);
  }
  //--------method-2: (with Jquery)--------required to include oninput=onFilterTextBoxChanged() in html file--------
  // onFilterTextBoxChanged(){
  //   this.gridApi.setQuickFilter(document.querySelector('#filter-text-box'));
  // }
  //=============== Quick central filter function ends ==========


  //============= set row height methods starts 100% working ==============
  getRowHeight(params:any) {
    return groupHeight;
    // if (params.node.group) {
    //   return groupHeight;
    // }
  }

  setGroupHeight(height:any) {
    groupHeight = height;
    this.mpTG.rowHeight = height;
    this.mpTG.gridApi.resetRowHeights();
  }

  setRowHeight(height:any) {
    // rowHeight = height;
    // this.mpTG.gridApi.resetRowHeights();

    this.mpTG.gridApi.forEachNode(function (rowNode:any) {
      //if (rowNode.data && rowNode.data.country === 'Russia') {
      // rowHeight = height;
      // this.mpTG.gridApi.resetRowHeights();  
      rowNode.setRowHeight(height);
      //}
    });
    this.mpTG.gridApi.onRowHeightChanged();
  }
  //------- set row height methods ends ---------------

  //=========== voice recognition start ==========  

  voiceSearch(){
    
    alert("Please say any word that you want to search with");

    

    const quickVoiceSearch = (txt:any) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e:any){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
            //console.log(voiceHandler);
            //alert(e.results[0][0].transcript);
            
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            (document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);

            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e:any){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }

  viewByVoice(){
    
    alert("Please say only the number of your request/application within 2-seconds");

    const quickVoiceSearch = (txt:any) => {
      this.onGridReadyParamsApi.setQuickFilter(txt);

      let itm = [];
      let prKey = '';

      const reqDbInfo = this.dashboardsListsInfo[this.clickedDashboardInfo.listIndex];

      if(Object.prototype.hasOwnProperty.call(reqDbInfo.MasterListInfo, 'primaryKey')){
        prKey = reqDbInfo.MasterListInfo.primaryKey;
        if(prKey != 'Title'){
          itm = this.rowData.filter((item:any) => item[prKey] == this.dbTagUrlInfo.titleTag + txt);
        }
        else{
          itm = this.rowData.filter((item:any) => item.Title == this.dbTagUrlInfo.titleTag + txt);
        }
      }else{
        itm = this.rowData.filter((item:any) => item.Title == this.dbTagUrlInfo.titleTag + txt);
      }
        
        (document.getElementById('viewByVoiceText') as HTMLInputElement).value = '        ' + this.dbTagUrlInfo.titleTag + txt;
        
        if(reqDbInfo.ViewUrl.qryStrKeyTyp == 'GUID'){
          
          //this.dbTagUrlInfo.qryStrKeyVal = itm[0].GUID;
          const url = this.siteAbsoluteUrl +  reqDbInfo.ViewUrl.siteUrl + this.dbTagUrlInfo.qryStrKeyVal + reqDbInfo.ViewUrl.mode;
          window.open(url, "_blank");
        }
        else if(reqDbInfo.ViewUrl.qryStrKeyTyp == 'ID'){
          //this.dbTagUrlInfo.qryStrKeyVal = itm[0].ID;
          const url = this.siteAbsoluteUrl +  reqDbInfo.ViewUrl.siteUrl + this.dbTagUrlInfo.qryStrKeyVal + reqDbInfo.ViewUrl.mode;
          window.open(url, "_blank");
        }
        
    }

    if('webkitSpeechRecognition' in window){
        const vSearch = new webkitSpeechRecognition();
        vSearch.continuous = false;
        vSearch.interimresults = false;
        vSearch.lang = 'en-US';
        vSearch.start();
        //const voiceSearchForm = this.formSearch.nativeElement;
        //const voiceHandler = this.hiddenSearchHandler.nativeElement;
        //const srcTxtVoiceHandler = this.filterTextBox.nativeElement; // for filter
        //console.log(voiceSearchForm);
        vSearch.onresult = function(e:any){
          //console.log(voiceSearchForm);
          //voiceHandler.value = e.results[0][0].transcript;
            vSearch.stop();
                        
            this.txtOfQuickSearchInpFld = e.results[0][0].transcript;
            //(document.getElementById('filter-text-box') as HTMLInputElement).value = this.txtOfQuickSearchInpFld;
            quickVoiceSearch(this.txtOfQuickSearchInpFld);
            
            //voiceSearchForm.submit();
        }
  
        vSearch.onerror = function(e:any){
            console.log(e);
            vSearch.stop();
        }

        
        
    } else {
      alert("webkitSpeechRecognition is not available.");
      //console.log(this.state.get(configKey, undefined as any));
      }
  }



  clearSelection(){
    this.mpTG.gridApi.deselectAll();
    //this.agGrid.api.deselectAll();
  }

  onFldCategoryChanged() {
    this.fldCategory = (document.getElementById('fldCategory') as HTMLInputElement)
      .value;

      if( this.fldCategory == 'widgetColDef' ){
        this.rowData = [];
        this.rowData = this.widgetList;
      }      

    this.executeOnInitProcesses();
  }

  onPageSizeChanged() {
    const value = (document.getElementById('page-size') as HTMLInputElement)
      .value;
    this.mpTG.gridApi.paginationSetPageSize(Number(value));
  }

  //#### CRUD operation starts #### ===========
  async onAddRow() {
    const params = this.mpTG.grid;

    

    let newRow:object = {};

    const colDefArray = this.mpTG.gridApi.columnModel.columnDefs;

    await Promise.all(colDefArray.map(async (el:any) => {

      const keyVal = (el:any) => {
        return new Promise((res, rej) => {
          const key = el.field;

          if(key == "ID"){
            const objEle = {[key]: null};
            newRow = Object.assign(newRow, objEle)
          }else{
            const objEle = {[key]: ""};
            newRow = Object.assign(newRow, objEle)
          }
          
          res(newRow);

        })
      }     

      await keyVal(el);

    })).then(results => {

      // this.rowData = [...this.rowData, newRow]
      // this.mpTG.gridApi.setRowData(this.rowData);

      //const nodeIndex = this.mpTG.gridApi.rowModel.rowsToDisplay.length - 1;
      const nodeIndex = 0;

      this.mpTG.gridApi.updateRowData({ 
        add: [newRow],
        addIndex: nodeIndex 
      });

      this.mpTG.defaultColDef.editable = true;

      const newRowNode = this.mpTG.gridApi.getRowNode(nodeIndex);
      newRowNode.setRowHeight(43);
      
      this.mpTG.gridApi.onRowHeightChanged();  

      params.api.startEditingCell({
        rowIndex: nodeIndex,
        // gets the first columnKey
        colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
      }); 
      
          

    }).then(()=>{

      // const listName = (params.node.data['odata.type']).slice(8, -8);

      
    });
   
    
    

    
    
    // //const confirm = window.confirm("Are you sure, you want to update this row ?");
    
    // //const apiUrl= `https://portal.bergerbd.com/_api/web/lists/getByTitle('WorkshopProposalMaster')/items(${params.node.data.Id})` ;
    
  
    // this.updatedata = Object.keys(params.node.data)
    //   .filter((key) => (key != "Author" && key != "Author@odata.navigationLinkUrl" && key != "Created" && key != "GUID" && key != "ID" && key != "Id" && key != "odata.editLink" && key != "odata.etag" && key != "odata.id" && key != "odata.type" && key != "[[Prototype]]" && key != "EmployeeId" && key != "PendingWith"))
    //   .reduce((obj, key) => {
    //       return Object.assign(obj, {
    //         [key]: params.node.data[key]
    //       });
    // }, {});

    // const listName = (params.node.data['odata.type']).slice(8, -8);           

    
    //this.sharepointlistService.updateListItem(listInfo);  
    


    //this.mpTG.gridApi.updateRowData({ add: [newRow] });


    // this.gridApi.getFilterInstance("col3").resetFilterValues();
    // this.gridApi.getFilterInstance("col4").resetFilterValues();
  }

  onCellClicked(params:any) {    //params:CellClickedEvent
    // Handle click event for action cells
    if (params.column.colId === "ID" && params.event.target.dataset.action) {
      const action = params.event.target.dataset.action;

      if (action === "add") {
        const rowIndex = 1+ params.node.rowIndex;
        let rowDataOnAdd: any[] = [];
        rowDataOnAdd = [];
        this.rowData = [];
        this.rowData = rowDataOnAdd;        
        this.mpTG.gridApi.setRowData(rowDataOnAdd);
        
      }
      else if (action === "edit") {
        this.mpTG.defaultColDef.editable = true;
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });

        //== resize the Row Height ===
        params.node.setRowHeight(43);        
        this.mpTG.gridApi.onRowHeightChanged(); 
      }
      else if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }
      else if (action === "update") {  

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, update it!'
        }).then((result:any) => {     

          if (result.isConfirmed) {
            params.api.stopEditing(false);  
            //const confirm = window.confirm("Are you sure, you want to update this row ?");
            
            this.updatedata = Object.keys(params.node.data)
              .filter((key) => (key != "Author" && key != "Author@odata.navigationLinkUrl" && key != "Created" && key != "GUID" && key != "ID" && key != "Id" && key != "odata.editLink" && key != "odata.etag" && key != "odata.id" && key != "odata.type" && key != "[[Prototype]]" && key != "EmployeeId" && key != "PendingWith" && key != "undefined"))
              .reduce((obj, key) => {
                  return Object.assign(obj, {
                    [key]: params.node.data[key]
                  });
            }, {});

             
            
            if(params.node.data.ID == null){
              if(isNaN(this.updatedata.RemainingBalance) || isNaN(this.updatedata.ReceivedQty) || isNaN(this.updatedata.OpeningBalance) ){
                alert("RemainingBalance, ReceivedQty and OpeningBalance fields allows only numerical value !");
                return false;
              }
              const listName = this.listInfo.name;
              const listInfo = {
                name: listName,
                //rId: params.node.data.Id,
                item: this.updatedata,
              }
              
              this.sharepointlistService.saveListItem(listInfo).then((res:any)=>{
                const accessoryCode = this.updatedata.AccessoryCode;
                const stockListsUrl = "https://portal.bergerbd.com/leaveauto/_api/web/lists/getByTitle('ITAccessoriesStock')/items?&$top=2000&$select=ID,GUID,RemainingBalance&$filter=AccessoryCode eq '" + accessoryCode + "'";
                
                this.httpClient.get(stockListsUrl).subscribe((data:any) =>{

                  const stockListItems = JSON.parse(JSON.stringify(data['value']));

                  if(stockListItems.length >0){
                    const remBal = this.updatedata.RemainingBalance ;
                    const availability = this.updatedata.Availability;                   
                    const stockListInfo = {
                      name: "ITAccessoriesStock",
                      rId: stockListItems[0].ID,
                      item: {
                        "RemainingBalance": remBal,
                        "Availability": availability
                      },
                    }

                    this.sharepointlistService.updateListItem(stockListInfo);
                    
                  }
                  else{
                    //===save in the "ITAccessoriesStock" list as a new item
                    const newData = {
                      AccessoryCode: this.updatedata.AccessoryCode,
                      AccessoryCategory: this.updatedata.AccessoryCategory,
                      AccessorySubCategory: this.updatedata.AccessorySubCategory,
                      AccessoryName: this.updatedata.AccessoryName, 
                      RemainingBalance: Number(this.updatedata.RemainingBalance),
                      UOM: this.updatedata.UOM,
                      Availability : this.updatedata.Availability
                    };

                    const stockListInfo = {
                      name: "ITAccessoriesStock",
                      //rId: stockListItems[0].ID,
                      item: newData,
                    }

                    this.sharepointlistService.saveListItem(stockListInfo);
                  }
                });
              });

            }else{
              if(isNaN(this.updatedata.RemainingBalance) || isNaN(this.updatedata.ReceivedQty) || isNaN(this.updatedata.OpeningBalance) ){
                alert("RemainingBalance, ReceivedQty and OpeningBalance fields allows only numerical value !");
                return false;
              }
              const listName = (params.node.data['odata.type']).slice(8, -8);
              const listInfo = {
                name: listName,
                rId: params.node.data.Id,
                item: this.updatedata,
              }
  
              this.sharepointlistService.updateListItem(listInfo).then((res:any)=>{
                const accessoryCode = this.updatedata.AccessoryCode;
                const stockListsUrl = this.siteAbsoluteUrl + "/leaveauto/_api/web/lists/getByTitle('ITAccessoriesStock')/items?&$top=2000&$select=ID,GUID,RemainingBalance&$filter=AccessoryCode eq '" + accessoryCode + "'";
                
                this.httpClient.get(stockListsUrl).subscribe((data:any) =>{

                  const stockListItems = JSON.parse(JSON.stringify(data['value']));

                  if(stockListItems.length >0){
                    const remBal = this.updatedata.RemainingBalance ;
                    const availability = this.updatedata.Availability;                    
                    const stockListInfo = {
                      name: "ITAccessoriesStock",
                      rId: stockListItems[0].ID,
                      item: {
                        "RemainingBalance":remBal,
                        "Availability": availability
                      },
                    }

                    this.sharepointlistService.updateListItem(stockListInfo);
                    
                  }else{
                    alert("Fetching List info failed !");
                  }
                });
              });
            }

            
          
          }

          //== resize the Row Height ===
          params.node.setRowHeight(25);        
          this.mpTG.gridApi.onRowHeightChanged();
          
          return null;
        })

      }
      else if (action === "cancel") {
        params.api.stopEditing(true);

        //== resize the Row Height ===
        params.node.setRowHeight(25);        
        this.mpTG.gridApi.onRowHeightChanged();
      }
      else if (action === "pick") {
        let jsonParams = JSON.stringify(params.data);
        this.parentEmitter.emit(jsonParams);
        //this.onRowDrag(params); 
      }
    }
  }

  onRowEditingStarted(params:RowEditingStartedEvent) {
    //this.mpTG.gridApi.refreshCells({force: true});
    params.api.refreshCells({
      columns: ["ID"],
      rowNodes: [params.node],
      force: true
    });
  }

  onRowEditingStopped(params:RowEditingStoppedEvent) {
    params.api.refreshCells({
      columns: ["ID"],
      rowNodes: [params.node],
      force: true
    });
  }

  onCellEditingStarted(event: CellEditingStartedEvent) {
    console.log('cellEditingStarted');
  }

  onCellEditingStopped(event: CellEditingStoppedEvent) {
    console.log('cellEditingStopped');
  }

  ngAfterViewInit(): void {
    // $(this.footer?.nativeElement).on('click', ()=>{
    //   alert("Welcome to Footer !");
    // })
    console.log();
  }

  ngAfterViewChecked() {
    //this.stylesLoaded = true;
    console.log();
  }

  async loadStandaloneComponent() {
    // const component = await import('../app-data-capture/app-data-capture.component').then(
    //   (m) => m.AppDataCaptureComponent
    // );

    // this.lazyComponentContainer.createComponent(component);
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


  onDragOver(event: any) {
    const dragSupported = event.dataTransfer.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  }

  onDrop(event: any) {
    const jsonData = event.dataTransfer.getData('application/json');
    let eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;
    let eJsonDisplay = document.querySelector('#eJsonDisplay')!;
    eJsonDisplay.appendChild(eJsonRow);
    event.preventDefault();

    this.parentEmitter.emit('Hello from the parent component!');
  }

  onRowDrag(params: DndSourceOnRowDragParams) {
    // create the data that we want to drag
    const rowNode = params.rowNode;
    let e = params.dragEvent;
    let jsonObject = {
      // grid: 'GRID_001',
      // operation: 'Drag on Column',
      // type: rowNode.data.schemaType,
      // selected: rowNode.isSelected(),
      type: rowNode.data.schemaType,
    };
    const jsonData = JSON.stringify(jsonObject);
    e.dataTransfer!.setData('application/json', jsonData);
    e.dataTransfer!.setData('text/plain', jsonData);
  
    //this.parentEmitter = params.rowNode.data.schemaType;
    
  }

  addDropZones(params: GridReadyEvent) {
    const tileContainer = document.querySelector('.tile-container') as any;
    let dropZone: RowDropZoneParams = {
      getContainer: () => {
        return tileContainer as any;
      },
      onDragStop: (params) => {
        //let tile = createTile(params.node.data);
        //tileContainer.appendChild(tile);
      },
    };
    params.api.addRowDropZone(dropZone);
  }

  pickUp(params:any){
    let param = params;
    console.log(param);
  }


  
}

//let rowHeight; 
let groupHeight:any;

// function onRowDrag(params: DndSourceOnRowDragParams) {
//   // create the data that we want to drag
//   const rowNode = params.rowNode;
//   let e = params.dragEvent;
//   let jsonObject = {
//     // grid: 'GRID_001',
//     // operation: 'Drag on Column',
//     // type: rowNode.data.schemaType,
//     // selected: rowNode.isSelected(),
//     type: rowNode.data.schemaType,
//   };
//   const jsonData = JSON.stringify(jsonObject);
//   e.dataTransfer!.setData('application/json', jsonData);
//   e.dataTransfer!.setData('text/plain', jsonData);

//   parentEmitter = rowNode.data.schemaType;
// }
