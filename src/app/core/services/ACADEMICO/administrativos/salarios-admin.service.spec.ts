import { TestBed } from '@angular/core/testing';

import { SalariosAdminService } from './salarios-admin.service';

describe('SalariosAdminService', () => {
  let service: SalariosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalariosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
