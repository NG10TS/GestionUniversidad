import { TestBed } from '@angular/core/testing';

import { ConvEstUniCarrerasService } from './conv-est-uni-carreras.service';

describe('ConvEstUniCarrerasService', () => {
  let service: ConvEstUniCarrerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvEstUniCarrerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
