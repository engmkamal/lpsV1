/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IField, IFieldsnavigation } from '../models/fieldsnavigation';
import { catchError, tap } from 'rxjs/operators';
import { Observable, lastValueFrom, of } from 'rxjs';
import { FieldsnavigationStore } from './fieldsnavigation.store';

@Injectable({
  providedIn: 'root'
})
export class FieldsnavigationService {

  baseUrl: string;

  allFields$!: Observable<IField[]>;

  //store = inject(FieldsnavigationStore);

  constructor(private _http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }

  async getFieldsnavigation() {
    const fields$ = await this._http
      .get<IField[]>(`${this.baseUrl}/formfields.json`)
      // .pipe(
      //   tap((project) => {

      //     //const out = project;
      //     //console.log(out);

      //     //this.store.fields(). = project;

      //     // this._store.update((state) => ({
      //     //     ...state,
      //     //     ...project
      //     //   }));
      //   }),
      //   catchError((error) => {
      //     return of(error);
      //   })
      // )
      // .subscribe();

      const fields = await lastValueFrom(fields$);

      fields$.subscribe((data:any)=>{
        this.allFields$ =  data;
      })

      return fields;

  }

}


