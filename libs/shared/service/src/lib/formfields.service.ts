/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, throwError, of} from 'rxjs';
import { catchError, filter, map, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ISchema, ITemplateDetails, ITemplateMaster } from '@lps/models';
import { environment, apis } from '@lps/assets';

//import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class FormfieldsService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>('');

  private env = environment.production ? 'production' : 'development';

  constructor(private router: Router, private _http: HttpClient) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  fetchTemplateMaster(){
    
    const templateMasterApi = environment.production ? (apis.production.templetMaster as string) : (apis.development.templetMaster as string) ;
    return this._http.get<ITemplateMaster[]>(templateMasterApi)
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

  fetchLocTemplateMaster(){

    const templateMasterApi = environment.production ? (apis.production.templetMaster as string) : (apis.development.templetMaster as string) ;
    return this._http.get<ITemplateMaster[]>(templateMasterApi)
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

  fetchTemplateDetailsBySection(section: string){

    const templetDetApi = environment.production ? (apis.production.templetDetails as string) : (apis.development.templetDetails as string) ;
    return this._http.get<ITemplateDetails>(templetDetApi)
    .pipe(
      filter((tds)=> tds == section),
      catchError((error:any) => {
        console.log('Error handled by Nav Service', error.message);
        return throwError(() =>{
          console.log('Error rethrown by Nav Service');
          return new Error('Could not load data ...');
        })        
      }) 
    ) 

  }

  fetchAllSchema(){

    const schemaApi = environment.production ? (apis.production.schemas as string) : (apis.development.schemas as string) ;
    return this._http.get<ISchema[]>(schemaApi)
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

