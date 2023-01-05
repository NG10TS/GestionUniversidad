import { TestBed } from '@angular/core/testing';

import { PlanGastosService } from './plan-gastos.service';

describe('PlanGastosService', () => {
  let service: PlanGastosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanGastosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
