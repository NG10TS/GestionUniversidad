import { TestBed } from '@angular/core/testing';

import { PlanillasadminService } from './planillasadmin.service';

describe('PlanillasadminService', () => {
  let service: PlanillasadminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanillasadminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
