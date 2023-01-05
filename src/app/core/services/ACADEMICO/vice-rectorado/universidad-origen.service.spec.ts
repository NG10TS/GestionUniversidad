import { TestBed } from '@angular/core/testing';

import { UniversidadOrigenService } from './universidad-origen.service';

describe('UniversidadOrigenService', () => {
  let service: UniversidadOrigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadOrigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
