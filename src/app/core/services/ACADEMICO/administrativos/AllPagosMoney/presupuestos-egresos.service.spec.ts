import { TestBed } from '@angular/core/testing';

import { PresupuestosEgresosService } from './presupuestos-egresos.service';

describe('PresupuestosEgresosService', () => {
  let service: PresupuestosEgresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresupuestosEgresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
