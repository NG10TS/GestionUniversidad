import { TestBed } from '@angular/core/testing';

import { CargosAdminService } from './cargos-admin.service';

describe('CargosAdminService', () => {
  let service: CargosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
