import { TestBed } from '@angular/core/testing';

import { PagoextraService } from './pagoextra.service';

describe('PagoextraService', () => {
  let service: PagoextraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoextraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
