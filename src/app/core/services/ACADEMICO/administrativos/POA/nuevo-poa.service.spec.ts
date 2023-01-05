import { TestBed } from '@angular/core/testing';

import { NuevoPoaService } from './nuevo-poa.service';

describe('NuevoPoaService', () => {
  let service: NuevoPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NuevoPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
