/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

import {CdkDrag, CdkDragHandle} from '@angular/cdk/drag-drop';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxFullscreenModule } from '@ultimate/ngx-fullscreen';
import { NgxFullscreenDirective } from '@ultimate/ngx-fullscreen';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'lps-drag-accordion-card',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatExpansionModule, 
    CdkDrag, CdkDragHandle, MatIconModule, MatButtonModule, 
    NgxFullscreenModule, MatDividerModule 
  ],
  templateUrl: './drag-accordion-card.component.html',
  styleUrl: './drag-accordion-card.component.scss',
})
export class DragAccordionCardComponent implements OnInit {

  widgetrendererParam:any;
  title = 'angular-material-drag-and-drop-lists';
  panelOpenState = false;
  isFullscreenWindow = false;
  isActive = false;
  expanded = true;

  @ViewChild('dynamicCard') div!: ElementRef<Element>;
  @ViewChild('fullscreen') fullscreen!: NgxFullscreenDirective;
  
  constructor() {}

  ngOnInit(): void{ }

  toggleFullscreen(){}

  enterFullscreenDiv() {
    this.fullscreen.enter(this.div.nativeElement);
  }

  onTransition(e: any) {
    console.log('onTransition:', e);
  }

}


//=================================
// import { CommonModule } from '@angular/common';
// import { Component, ElementRef, ViewChild } from '@angular/core';
// import { NgxFullscreenDirective } from '@ultimate/ngx-fullscreen';
// import { NgxFullscreenModule } from '@ultimate/ngx-fullscreen';

// @Component({
//   selector: 'lps-drag-accordion-card',
//   template: `
//     <video 
//       [src]="src"
//       controls 
//       #video 
//       #fullscreen="ngxFullscreen"
//       ngxFullscreen
//       (transition)="onTransition($event)"
//     >
//     </video>
//     <a href="https://ultimate-ngx-fullscreen.stackblitz.io" target="_blank" class="msg">
//       Open in New Tab to Demo (click here)
//     </a>
//     <div>
//       <button 
//         type="button" 
//         (click)="fullscreen.enter()"
//       >
//         Fullscreen Document
//       </button>
      
//       <button 
//         type="button"
//         (click)="enterFullscreenVideo()"
//       >
//         Fullscreen &lt;video&gt;
//       </button>

//       <div style="margin: 5px; display: block;"></div>

//       <button 
//         type="button"
//         (click)="fullscreen.exit()"
//       >
//         Exit Fullscreen
//       </button>

//       <button 
//         type="button"
//         (click)="fullscreen.toggle()"
//       >
//         Toggle Fullscreen
//       </button>
//       <p>Fullscreen Mode: {{ fullscreen.isFullscreen ? 'Active' : 'Inactive' }}</p>
//     </div>
//   `,
//   styles: [
//     `
//     :host {
//       display: block;
//       background: #fff;
//       max-width: 450px;
//       border-radius: 10px;
//       margin: 50px auto;
//       padding: 10px;
//       font-size: 22px;
//       color: #545e6f;
//       text-align: center;
//     }

//     .msg {
//       color: red;
//       margin-bottom: 10px;
//       font-size: 14px;
//     }

//     video {
//       height: 250px;
//       max-width:100%;
//     }
//   `,
//   ],
//   standalone: true,
//   imports: [
//     CommonModule, NgxFullscreenModule 
//   ],
// })
// export class DragAccordionCardComponent {
//   get src() {
//     return `https://player.vimeo.com/progressive_redirect/playback/323437672/rendition/1080p?loc=external&signature=74c6db382aaf47d30781419ba6f918c84b7840d6e0d2445470853c28a1bd68c7`;
//   }

//   @ViewChild('video') video!: ElementRef<Element>;
//   @ViewChild('fullscreen') fullscreen!: NgxFullscreenDirective;

//   enterFullscreenVideo() {
//     this.fullscreen.enter(this.video.nativeElement);
//   }

//   onTransition(e: any) {
//     console.log('onTransition:', e);
//   }
// }


