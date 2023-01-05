import { TestBed } from '@angular/core/testing';

import { EgresoDetPresuService } from './egreso-det-presu.service';

describe('EgresoDetPresuService', () => {
  let service: EgresoDetPresuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresoDetPresuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
