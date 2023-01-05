import { TestBed } from '@angular/core/testing';

import { PresupuestosIngresosService } from './presupuestos-ingresos.service';

describe('PresupuestosIngresosService', () => {
  let service: PresupuestosIngresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresupuestosIngresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
