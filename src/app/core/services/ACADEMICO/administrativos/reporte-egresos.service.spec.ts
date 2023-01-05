import { TestBed } from '@angular/core/testing';

import { ReporteEgresosService } from './reporte-egresos.service';

describe('ReporteEgresosService', () => {
  let service: ReporteEgresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteEgresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
