import { TestBed } from '@angular/core/testing';

import { ListaEgresoService } from './lista-egreso.service';

describe('ListaEgresoService', () => {
  let service: ListaEgresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaEgresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
