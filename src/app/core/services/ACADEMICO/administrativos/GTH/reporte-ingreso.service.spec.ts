import { TestBed } from '@angular/core/testing';

import { ReporteIngresoService } from './reporte-ingreso.service';

describe('ReporteIngresoService', () => {
  let service: ReporteIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
