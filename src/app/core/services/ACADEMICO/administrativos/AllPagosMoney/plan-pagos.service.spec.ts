import { TestBed } from '@angular/core/testing';

import { PlanPagosService } from './plan-pagos.service';

describe('PlanPagosService', () => {
  let service: PlanPagosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanPagosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
