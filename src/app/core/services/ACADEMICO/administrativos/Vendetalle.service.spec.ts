
import { TestBed } from '@angular/core/testing';

import { VendetalleService } from './Vendetalle.service';

describe('VendetalleService', () => {
  let service: VendetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
