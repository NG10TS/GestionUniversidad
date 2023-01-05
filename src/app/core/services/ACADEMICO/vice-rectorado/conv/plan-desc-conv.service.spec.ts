import { TestBed } from '@angular/core/testing';

import { PlanDescConvService } from './plan-desc-conv.service';

describe('PlanDescConvService', () => {
  let service: PlanDescConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanDescConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
