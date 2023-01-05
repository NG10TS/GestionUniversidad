import { TestBed } from '@angular/core/testing';

import { ListaIngresoService } from './lista-ingreso.service';

describe('ListaIngresoService', () => {
  let service: ListaIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
