import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
//import { NgxLoadingComponent } from 'ngx-loading';

@Injectable({
  providedIn: 'root'
})
export class NgxLoadingService {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = 'green';
  public secondaryColour = '#ccc';
  public coloursEnabled = false;
  public borderRadius = '3px';
  public config = {
    animationType: ngxLoadingAnimationTypes.circle,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: this.borderRadius,
  };

  constructor() { }
}
