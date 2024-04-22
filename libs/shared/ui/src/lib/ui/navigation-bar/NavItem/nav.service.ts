/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, throwError} from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { HttpClient } from '@angular/common/http';
import { NavItem } from '@lps/models';
//import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>('');



  constructor(private router: Router, private _http: HttpClient) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }


  fetchNavItems(){
    return this._http.get<NavItem[]>('https://localhost:7095/api/LeftNavigation/GetAll')
    .pipe(
      catchError((error:any) => {
        console.log('Error handled by Nav Service', error.message);
        return throwError(() =>{
          console.log('Error rethrown by Nav Service');
          return new Error('Could not load data ...');
        })        
      }) 
    )
   

    
  }

  fetchLocalNavItems(){
    return this._http.get<NavItem[]>('https://localhost:7095/api/LeftNavigation/GetAll')
    .pipe(
      catchError((error:any) => {
        console.log('Error handled by Nav Service', error.message);
        return throwError(() =>{
          console.log('Error rethrown by Nav Service');
          return new Error('Could not load data ...');
        })        
      }) 
    )
   

    
  }


}
