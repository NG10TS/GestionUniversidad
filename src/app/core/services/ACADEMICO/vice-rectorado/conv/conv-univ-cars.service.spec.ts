import { TestBed } from '@angular/core/testing';

import { ConvUnivCarsService } from './conv-univ-cars.service';

describe('ConvUnivCarsService', () => {
  let service: ConvUnivCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvUnivCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
