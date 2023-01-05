import { TestBed } from '@angular/core/testing';

import { ResultadoPoaService } from './resultado-poa.service';

describe('ResultadoPoaService', () => {
  let service: ResultadoPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultadoPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
