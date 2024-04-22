import {Component, EventEmitter, HostBinding, Input, OnInit, signal} from '@angular/core';
import { NavItem } from '@lps/models';
import {Router, RouterModule} from '@angular/router';
import {NavService} from '../nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CommonModule } from '@angular/common';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialmodulesModule } from '@lps/utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lps-menu-list-item',
  standalone: true,
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  imports: [    
    CommonModule,
    // MatIconModule,
    // MatListModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatButtonModule,
    MaterialmodulesModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule
  ],
  providers: [NavService]
})
export class MenuListItemComponent implements OnInit {
  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item!: NavItem;
  @Input() depth!: number;

  panelOpenState = false;

  sideavWidthSignal = signal(6);
  @Input() set sidenavWidth(val:number){
    this.sideavWidthSignal.set(val);
  };

  
  //sidenavWidthChange = new EventEmitter<any>;

  isItemLink = false;

  constructor(public navService: NavService,
              public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item.route && url) {
        // console.log(`Checking '/${this.item.route}' against '${url}'`);
        this.expanded = url.indexOf(`/${this.item.route}`) === 0;
        this.ariaExpanded = this.expanded;
        // console.log(`${this.item.route} is expanded: ${this.expanded}`);
      }
    });

    if(Object.prototype.hasOwnProperty.call(this.item, 'children')){
      let ch:NavItem[] = this.item.children as NavItem[];
      if(ch.length >0){
        this.isItemLink = true;
      }      
    }
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
      this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }


  // sidenavWidthChangeEv(e:any){
  //   this.sidenavWidth = e;
  //   this.sidenavWidthChange.emit(e);
  // }


}
