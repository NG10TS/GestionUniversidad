import { TestBed } from '@angular/core/testing';

import { FodaService } from './foda.service';

describe('FodaService', () => {
  let service: FodaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FodaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
