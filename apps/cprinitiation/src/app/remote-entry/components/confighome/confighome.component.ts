/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';


@UntilDestroy()
@Component({
  selector: 'lps-confighome',
  templateUrl: './confighome.component.html',
  styleUrls: ['./confighome.component.scss']
})

export class ConfighomeComponent implements OnInit{  
  
  widgetrendererParam:any;
  title = 'angular-material-drag-and-drop-lists';
  panelOpenState = false;

  constructor() {}

  ngOnInit(): void{}

}



