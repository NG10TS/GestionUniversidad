import { TestBed } from '@angular/core/testing';

import { PlanpagoService } from './Planpago.service';

describe('PlanpagoService', () => {
  let service: PlanpagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanpagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
