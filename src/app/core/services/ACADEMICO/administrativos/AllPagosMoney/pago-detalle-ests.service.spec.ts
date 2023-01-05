import { TestBed } from '@angular/core/testing';

import { PagoDetalleEstsService } from './pago-detalle-ests.service';

describe('PagoDetalleEstsService', () => {
  let service: PagoDetalleEstsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoDetalleEstsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
