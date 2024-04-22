import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cprinithomeResolver } from './cprinithome.resolver';

describe('cprinithomeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cprinithomeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});




