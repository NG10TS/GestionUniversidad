import { TestBed } from '@angular/core/testing';

import { ListaRequerimientosService } from './lista-requerimientos.service';

describe('ListaRequerimientosService', () => {
  let service: ListaRequerimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaRequerimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
