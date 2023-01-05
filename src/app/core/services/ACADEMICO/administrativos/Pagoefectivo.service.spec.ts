import { TestBed } from '@angular/core/testing';

import { PagoefectivoService } from './Pagoefectivo.service';

describe('PagoefectivoService', () => {
  let service: PagoefectivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoefectivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
