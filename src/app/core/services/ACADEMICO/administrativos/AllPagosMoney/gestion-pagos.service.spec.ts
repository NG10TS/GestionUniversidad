import { TestBed } from '@angular/core/testing';

import { GestionPagosService } from './gestion-pagos.service';

describe('GestionPagosService', () => {
  let service: GestionPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
