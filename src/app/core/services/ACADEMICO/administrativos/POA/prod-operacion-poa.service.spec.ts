import { TestBed } from '@angular/core/testing';

import { ProdOperacionPoaService } from './prod-operacion-poa.service';

describe('ProdOperacionPoaService', () => {
  let service: ProdOperacionPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdOperacionPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
