import { TestBed } from '@angular/core/testing';

import { TipoAdminService } from './tipo-admin.service';

describe('TipoAdminService', () => {
  let service: TipoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
