import { TestBed } from '@angular/core/testing';

import { EgresoOperativosService } from './egreso-operativos.service';

describe('EgresoOperativosService', () => {
  let service: EgresoOperativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresoOperativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
