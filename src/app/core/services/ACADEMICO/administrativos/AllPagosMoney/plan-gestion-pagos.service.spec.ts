import { TestBed } from '@angular/core/testing';

import { PlanGestionPagosService } from './plan-gestion-pagos.service';

describe('PlanGestionPagosService', () => {
  let service: PlanGestionPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanGestionPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
