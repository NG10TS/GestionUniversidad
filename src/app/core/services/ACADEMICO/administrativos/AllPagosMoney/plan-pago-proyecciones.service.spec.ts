import { TestBed } from '@angular/core/testing';

import { PlanPagoProyeccionesService } from './plan-pago-proyecciones.service';

describe('PlanPagoProyeccionesService', () => {
  let service: PlanPagoProyeccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPagoProyeccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
