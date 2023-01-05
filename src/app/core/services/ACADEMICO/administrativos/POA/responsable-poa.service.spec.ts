import { TestBed } from '@angular/core/testing';

import { ResponsablePoaService } from './responsable-poa.service';

describe('ResponsablePoaService', () => {
  let service: ResponsablePoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsablePoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
