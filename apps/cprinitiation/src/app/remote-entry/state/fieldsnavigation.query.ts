/* eslint-disable @typescript-eslint/no-explicit-any */
import { toObservable } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal } from '@angular/core';
import { IssueStatus } from '../interface/field-status';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FieldsnavigationStore } from './fieldsnavigation.store';
import { IField } from '../models/fieldsnavigation';

@Injectable({
  providedIn: 'root'
})
export class FieldsnavigationQuery {

  fieldstore = inject(FieldsnavigationStore);

  constructor( ) { }

  lastIssuePosition = (status: IssueStatus): number => {
    const raw = this.fieldstore.fields();
    const issuesByStatus = raw.filter(x => x.status === status);
    return issuesByStatus.length;
  };

  // issueByStatusSorted$ = (status: IssueStatus): Observable<IField[]> => toObservable(signal<IField[]>(this.fieldstore.fields())).pipe(
  //     map((issues) => issues
  //         .filter((x:any) => x.status === status)
  //         .sort((a:any, b:any) => a.listPosition - b.listPosition))
  //   );

  // issueByStatusSorted$ = (status: IssueStatus) => this.fieldstore.fields()
  //         .filter((x:any) => x.status === status)
  //         .sort((a:any, b:any) => a.listPosition - b.listPosition)

          issueByStatusSorted(status: IssueStatus){
            const allFld = this.fieldstore.fields();
            const filFld = allFld.filter((x) => x.status === status); 
            return filFld;            
          }
          // this.fieldstore.fields()
          // .filter((x:any) => x.status === status)
          //.sort((a:any, b:any) => a.listPosition - b.listPosition)
          
  issueById$(issueId: string){
    return toObservable(signal<IField[]>(this.fieldstore.fields())).pipe(
      delay(500),
      map((issues) => issues.find((x:any) => x.id === issueId))
    );
  }
}
