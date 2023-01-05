import { TestBed } from '@angular/core/testing';

import { IngresoOperativosService } from './ingreso-operativos.service';

describe('IngresoOperativosService', () => {
  let service: IngresoOperativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoOperativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
