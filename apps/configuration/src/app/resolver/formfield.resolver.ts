import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormfieldsService } from '@lps/service';
import { ITemplateMaster, ITemplateDetails, ISchema } from '@lps/models';


export const formfieldResolver: ResolveFn<ISchema[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(FormfieldsService).fetchAllSchema();
  //return inject(FormfieldsService).fetchTemplateDetailsBySection(route.paramMap.get('id')!);
};

