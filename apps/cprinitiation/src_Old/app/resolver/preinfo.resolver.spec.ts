import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { preinfoResolver } from './preinfo.resolver';

describe('preinfoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => preinfoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
