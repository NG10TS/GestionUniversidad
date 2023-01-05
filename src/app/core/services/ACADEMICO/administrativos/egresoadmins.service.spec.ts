import { TestBed } from '@angular/core/testing';

import { EgresoadminsService } from './egresoadmins.service';

describe('EgresoadminsService', () => {
  let service: EgresoadminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresoadminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
