import { TestBed } from '@angular/core/testing';

import { PlanillaAdminsService } from './PlanillaAdmins.service';

describe('PlanillaAdminService', () => {
  let service: PlanillaAdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanillaAdminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
