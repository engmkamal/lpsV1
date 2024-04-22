import { TestBed } from '@angular/core/testing';

import { FormfieldsService } from './formfields.service';

describe('FormfieldsService', () => {
  let service: FormfieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormfieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
