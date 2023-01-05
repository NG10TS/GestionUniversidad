import { TestBed } from '@angular/core/testing';

import { DistribucionPresuService } from './distribucion-presu.service';

describe('DistribucionPresusService', () => {
  let service: DistribucionPresuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistribucionPresuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
