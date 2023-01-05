import { TestBed } from '@angular/core/testing';

import { PlandeudaService } from './Plandeuda.service';

describe('PlandeudaService', () => {
  let service: PlandeudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlandeudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
