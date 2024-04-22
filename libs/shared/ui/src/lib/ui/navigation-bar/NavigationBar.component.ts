/* eslint-disable @typescript-eslint/no-explicit-any */
import { 
  Component, OnInit, ChangeDetectorRef, ViewEncapsulation, 
  Input, AfterViewInit, EventEmitter, Output, signal, computed, 
  WritableSignal, inject
  //AfterViewInit, OnDestroy
 } from '@angular/core';
import { 
  CommonModule, 
  //DOCUMENT 
} from '@angular/common';
import { 
  FormBuilder, FormGroup, 
  //Validators 
} from '@angular/forms';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
//import { distinctUntilChanged } from 'rxjs/operators';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MaterialmodulesModule } from '@lps/utils';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FullscreenService, NavbarService } from '@lps/service';
import { MenuListItemComponent } from './NavItem/menu-list-item/menu-list-item.component';
import { NavItem } from '@lps/models';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { NavService } from './NavItem/nav.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { NavbarItems, apis } from '@lps/assets';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { BrowserModule } from '@angular/platform-browser';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {MatToolbarModule} from '@angular/material/toolbar';

class NavigationInfoModel{
  "bLogo": string;
  "bName": string;
  "user":{
    "name":string;
    "email":string
  }
}

@Component({
  selector: 'lps-navigation-bar',
  standalone: true,
  imports: [    
    CommonModule, 
    FlexLayoutModule,
    MaterialmodulesModule,
    RouterModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MenuListItemComponent
  ],
  templateUrl: './NavigationBar.component.html',
  styleUrl: './NavigationBar.component.scss',
  providers: [
    NavService,
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class NavigationBarComponent implements OnInit, AfterViewInit {

  navService = inject(NavService);
  navbarService = inject(NavbarService);

  elem!:HTMLElement;
  

  windowOrigin = window.location.origin;
  mobileQuery: MediaQueryList;      
  isCardExpanded = false; //== Mat Card ==
  private _mobileQueryListener: () => void;
  opened!: boolean;
  dragPosition = {x: 0, y: 0};

  _form!: FormGroup;
  
  showLoginFrm = false;

  nav_position = 'end';
  openedStartDrawer!: boolean;
  openedEndDrawer!: boolean;

  date = (new Date()).toDateString();
  time = (new Date()).toLocaleTimeString();

  //---for mat card static data ---
  _matcardInfo = { 
    dragPosition: {x: 10, y: 10},
    divStyle: {
      resize: 'both',
      overflow: 'hidden',
      width: '340px',
      height: '300px',
      background: 'whitesmoke'//'#87AFC7'
    },
    matCardTitle: 'Info to identify a solution:',
    styleTitle:{
      textAlign: 'center', 
      color: 'navy',
      fontFamily:'Arial',
      fontWeight: 100,
      fontSize: '16px'
    }, 
    matCardSubtitle: 'Please provide some more details about your issue.',
    styleSubTitle:{
      textAlign: 'left', 
      color: 'black',
      fontFamily:'Arial',
      fontWeight: 80,
      fontSize: '12px'
    },
    matCardContent: '',
    styleContent:{
      textAlign: 'left', 
      color: 'gray',
      fontFamily:'Arial',
      fontWeight: 50,
      fontSize: '10px'
    },
    matCardImage: '',
    matCardActions: '',
    matCardFooter: '',
  };

  BergerEmpEmail = "";

  showEmpLoginFrm = false;

  sidenavWidth = signal(5);

  // @Output() 
  sidenavWidthChange = new EventEmitter<any>;
  
  ngStyle!: string;

  loggeduser = { id: 1, name: `Person Name`, email: `person@gmail.com` };

  @Input() 
  public navigationInfo!: NavigationInfoModel;

  isFullscreenWindow = false;

  localNavItems: WritableSignal<NavItem[]> = signal([
    {
        displayName: 'Priliminary Information',
        iconName: 'add_to_queue',
        route: 'cprinitiationhome'
    },
    {
        displayName: 'Borrower Profile',
        iconName: 'assignment_ind',
        route: 'disney',
        children: [
            {
                displayName: 'Client Details',
                iconName: 'group',
                route: 'disney/speakers', 
            },
            {
                displayName: 'Income & Expenditure',
                iconName: 'monetization_on',
                route: 'disney/sessions',
            },
            {
                displayName: 'Assets and Liabilities',
                iconName: 'score',
                route: 'disney/feedback'
            }
        ]
    },
    {
        displayName: 'Facility details',
        iconName: 'shop',
        route: 'disney',
        children: [
            {
                displayName: 'Proposed Facility',
                iconName: 'account_balance',
                route: 'disney/speakers',
            },
            {
                displayName: 'Existing Facility',
                iconName: 'business_center',
                route: 'disney/sessions',
            }
        ]
    },
    {
        displayName: 'Security and Valuation',
        iconName: 'security',
        route: 'disney',
        children: [
            {
                displayName: 'Colletaral Security',
                iconName: 'group',
                route: 'disney/speakers',
            },
            {
                displayName: 'Guarantor',
                iconName: 'group_add',
                route: 'disney/sessions',
            },
            {
                displayName: 'Insurance',
                iconName: 'local_atm',
                route: 'disney/feedback'
            }
        ]
    },
    {
        displayName: 'Sanction History',
        iconName: 'business',
        route: 'devfestfl'
    },
    {
        displayName: 'Regulatory Table',
        iconName: 'ballot',
        route: 'disney',
        children: [
            {
                displayName: 'Down Payment Table',
                iconName: 'payment',
                route: 'disney/speakers',
            },
            {
                displayName: 'Write Off Table',
                iconName: 'table_chart',
                route: 'disney/sessions',
            },
            {
                displayName: 'Interest Waiver Table',
                iconName: 'strikethrough_s',
                route: 'disney/feedback'
            },
            {
                displayName: ' Suit File Table',
                iconName: 'speaker_notes',
                route: 'disney/sessions',
            },
            {
                displayName: 'Legal Steps',
                iconName: 'speaker_notes',
                route: 'disney/sessions',
            }
        ]
    },
    {
      displayName: 'Analysis',
      iconName: 'assessment',
      route: 'disney',
      children: [
          {
              displayName: 'CIB',
              iconName: 'payment',
              route: 'disney/speakers',
          },
          {
              displayName: 'Working Capital Assessment',
              iconName: 'table_chart',
              route: 'disney/sessions',
          },
          {
              displayName: 'Business Received',
              iconName: 'strikethrough_s',
              route: 'disney/feedback'
          },
          {
              displayName: 'Earning Received',
              iconName: 'speaker_notes',
              route: 'disney/sessions',
          },
          {
              displayName: 'Repayment Behavior',
              iconName: 'speaker_notes',
              route: 'disney/sessions',
          }
      ]
    },
    {
      displayName: 'Attachment & Checklist',
      iconName: 'attach_file',
      route: 'formfields'
    },
    {
      displayName: 'Details View',
      iconName: 'view_list',
      route: 'disney'
    },
    {
      displayName: 'Workflow & User Role',
      iconName: 'supervised_user_circle',
      route: 'disney',
      children: [
          {
              displayName: 'Down Payment Table',
              iconName: 'payment',
              route: 'disney/speakers',
          },
          {
              displayName: 'Write Off Table',
              iconName: 'table_chart',
              route: 'disney/sessions',
          },
          {
              displayName: 'Interest Waiver Table',
              iconName: 'strikethrough_s',
              route: 'disney/feedback'
          },
          {
              displayName: ' Suit File Table',
              iconName: 'speaker_notes',
              route: 'disney/sessions',
          },
          {
              displayName: 'Legal Steps',
              iconName: 'speaker_notes',
              route: 'disney/sessions',
          }
      ]
  },
  {
    displayName: 'Dashboard',
    iconName: 'dashboard',
    route: 'disney',
    children: [
        {
            displayName: 'Down Payment Table',
            iconName: 'payment',
            route: 'disney/speakers',
        },
        {
            displayName: 'Write Off Table',
            iconName: 'table_chart',
            route: 'disney/sessions',
        },
        {
            displayName: 'Interest Waiver Table',
            iconName: 'strikethrough_s',
            route: 'disney/feedback'
        },
        {
            displayName: ' Suit File Table',
            iconName: 'speaker_notes',
            route: 'disney/sessions',
        },
        {
            displayName: 'Legal Steps',
            iconName: 'speaker_notes',
            route: 'disney/sessions',
        }
    ]
  },
  {
    displayName: 'Form Configuration',
    iconName: 'perm_data_setting',
    route: './',
    children: [
        {
            displayName: 'Form Field',
            iconName: 'iso',
            route: 'formfields',
        },
        {
            displayName: 'Form Widget',
            iconName: 'create_new_folder',
            route: 'formwidgets',
        },
        {
            displayName: 'Navigation Section',
            iconName: 'developer_board',
            route: 'confighome'
        },
        {
            displayName: 'Nav Section Board',
            iconName: 'developer_board',
            route: 'dndconfig/board',
        },
        {
            displayName: 'Legal Steps',
            iconName: 'speaker_notes',
            route: 'disney/sessions',
        }
    ]
  },
  {
    displayName: 'CPR Initiation',
    iconName: 'list_alt',
    route: 'disney',
    children: [
        {
            displayName: 'Priliminary Information',
            iconName: 'edit',
            route: 'disney/speakers',
        },
        {
            displayName: 'Write Off Table',
            iconName: 'table_chart',
            route: 'disney/sessions',
        },
        {
            displayName: 'Interest Waiver Table',
            iconName: 'strikethrough_s',
            route: 'disney/feedback'
        },
        {
            displayName: ' Suit File Table',
            iconName: 'speaker_notes',
            route: 'disney/sessions',
        },
        {
            displayName: 'Legal Steps',
            iconName: 'speaker_notes',
            route: 'disney/sessions',
        }
    ]
  }
  ]);

  navItems$!:Observable<NavItem[]>;
  navItems: WritableSignal<NavItem[] | undefined> = signal([]);
  //navItemsSignal: WritableSignal<NavItem[] | undefined> = signal([]);
  
  // Workaround for angular component issue #13870
  disableAnimation = true;

  sklLogoHt = computed(()=> (this.sidenavWidth() < 6) ? '20' : '40');
  sklLogoWid = computed(()=> (this.sidenavWidth() < 6) ? '70' : '145');

  error:Error | null = null;

  leftNavItemsApi = apis.development.leftNavItems as string;

  loadContainer = true;
  

  constructor(
    //@Inject(DOCUMENT) private document: Document,
    private formBuilder: FormBuilder,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private fullscreenService: FullscreenService,
    private _http: HttpClient) {
      
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);   

      this.opened = false; //for open side nav onInit
      this.openedStartDrawer = false;
      this.openedEndDrawer = false;
    }

  async ngOnInit() {


    this.elem = document.documentElement;
    //==============checking login authorization ===========
        
    // this.isLoggedIn$
    //   .pipe(distinctUntilChanged())
    //   .subscribe(async (loggedIn) => {
    //     if (!loggedIn) {
    //       window.location.href = this.windowOrigin + '/login';
    //       //this.router.navigate(['/login']);
          
    //     }else if( localStorage.getItem('logedCustId') == null && localStorage.getItem('logedEmpEmail') == null){
    //       window.location.href = this.windowOrigin + '/login';         
    //     } 
    //     else {
    //       this.showLoginFrm = false;
    //     }
    //   });  
    //---------------------------


   
    
   //============= get NavItems from Server start (working 100%) =====
    
    // this.navItems$ = await this._http.get<NavItem[]>('https://localhost:7095/api/LeftNavigation/GetAll')
    // .pipe(
    //   catchError((error:any) => {
    //     console.log('Error handled by Nav Service', error.message);
    //     return throwError(() =>{
    //       console.log('Error rethrown by Nav Service');
    //       return new Error('Could not load data ...');
    //     })        
    //   }) 
    // )

    this.navItems$ = await this.navbarService.fetchNavItems()
    .pipe(
      tap({
        error: (error) => {
          this.error = error;
          console.log(`NavigationBarComponent's 'error' property showing the error banner`)
        }
      }),
      catchError(err => {
        console.log(`Replacing the failed observable with an empty array`);
        return of([]);
      })
    )

    // this.navItems$ = await this.navItems$.pipe(
    //   map(productsArray =>
    //     productsArray.filter(product => {
    //         product.ParentMenuId === 0;
    //     }))
    // );
    
    await this.navItems$.subscribe((data:any)=>{
          
        if(data.length > 0){
          // const filteredData = data.filter((d:any) => d.ParentMenuId === 0)
          // this.navItems.set(filteredData);
          this.navItems.set(data);
          this.loadContainer = false;
        }else{
          //let staticNavItems = NavbarItems;
          this.navItems.set(NavbarItems);
          this.loadContainer = false;
      
          // this.navItems$ = this.navService.fetchLocalNavItems()
          // .pipe(
          //   tap({
          //     error: (error) => {
          //       this.error = error;
          //       console.log(`NavigationBarComponent's 'error' property showing the error banner`)
          //     }
          //   }),
          //   catchError(err => {
          //     console.log(`Replacing the failed observable with an empty array`);
          //     return of([]);
          //   })
          // )

          // this.navItems$.subscribe((d:any)=>{
          //   if(d.length > 0){
          //     this.navItems.set(d);
          //   }
          // })
    
        }
    
    })
    
    //----------- get NavItems from Server ends ------
    
    

    

  }

  async getNavItems(){
    const mappedNavItm$ = await this._http.get("https://localhost:7095/api/LeftNavigation/GetAll")

    // const fields = await mappedNavItm$.pipe(map((res:any) => ({
    //   leftNavItem: res.leftNavItem,
    //   children: res.leftNavItemDtoList
    // })))
    // .subscribe(luke => console.log(luke));

    // const fields = await mappedNavItm$.pipe(map((res:any) => ({
    //   ...res.leftNavItem,
    //   children: res.leftNavItemDtoList
    // })))
    // .subscribe(luke => console.log(luke));

    const mappedNavItm = await lastValueFrom(mappedNavItm$);

    return mappedNavItm;
  }

  private _createForm() {
    this._form = this.formBuilder.group({
        TestParameters: this.formBuilder.array([])
    });
  }

  ddlChangeSelection(){    
    //this.openedStartDrawer = true;
    this.openedEndDrawer = true;
  }

  GetOutputVal() {
    console.log("");
  }

  loginAsEmployee(){
    //window.location.href = `https://bergerpaintsbd.sharepoint.com/sites/BergerTech/closeConnection.aspx?loginasanotheruser=true&source=/SitePages/bergertechportal.aspx`;
    
    this.showLoginFrm = !this.showLoginFrm;

    this.showEmpLoginFrm = true;
  }

  GetMenueOutputVal(pageUrl:string){
    window.location.href = this.windowOrigin + pageUrl ;
  }

  increase() {
    this.sidenavWidth.set(25);
    this.openedStartDrawer = true;
    this.sidenavWidthChange.emit(25);
    console.log('increase sidenav width');
  }

  decrease() {
    this.sidenavWidth.set(5);
    this.openedStartDrawer = false;
    this.sidenavWidthChange.emit(5);
    console.log('decrease sidenav width');
  }

  // openFullscreen() {
  //   if (this.elem.requestFullscreen) {
  //     this.elem.requestFullscreen();
  //   } else if (this.elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     this.elem.mozRequestFullScreen();
  //   } else if (this.elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari and Opera */
  //     this.elem.webkitRequestFullscreen();
  //   } else if (this.elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     this.elem.msRequestFullscreen();
  //   }
  // }

  //   /* Close fullscreen */
  //   closeFullscreen() {
  //     if (document.exitFullscreen) {
  //       this.document.exitFullscreen();
  //     } else if (this.document.mozCancelFullScreen) {
  //       /* Firefox */
  //       this.document.mozCancelFullScreen();
  //     } else if (this.document.webkitExitFullscreen) {
  //       /* Chrome, Safari and Opera */
  //       this.document.webkitExitFullscreen();
  //     } else if (this.document.msExitFullscreen) {
  //       /* IE/Edge */
  //       this.document.msExitFullscreen();
  //     }else{
  //       console.log();
  //     }
  //   }



  toggleFullscreen(){
    this.fullscreenService.toggle();
    this.isFullscreenWindow = !this.isFullscreenWindow;
  }

  ngAfterViewInit(): void {
    // timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
    setTimeout(() => this.disableAnimation = false);
  }

  // sidenavWidthChangeEv(e:any){
  //   this.sidenavWidth = e;
  // }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    // if (item.children && item.children.length) {
    //   this.expanded = !this.expanded;
    // }
  }



  

  
}






