import { TestBed } from '@angular/core/testing';

import { PresService } from './pres.service';

describe('PresService', () => {
  let service: PresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
