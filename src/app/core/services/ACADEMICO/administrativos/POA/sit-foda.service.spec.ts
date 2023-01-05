import { TestBed } from '@angular/core/testing';

import { SitFodaService } from './sit-foda.service';

describe('SitFodaService', () => {
  let service: SitFodaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitFodaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
