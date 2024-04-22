import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { formfieldResolver } from './formfield.resolver';

describe('formfieldResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => formfieldResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
