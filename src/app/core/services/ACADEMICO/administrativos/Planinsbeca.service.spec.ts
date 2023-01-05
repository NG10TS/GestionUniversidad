import { TestBed } from '@angular/core/testing';

import { PlaninsbecaService } from './Planinsbeca.service';

describe('PlaninsbecaService', () => {
  let service: PlaninsbecaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaninsbecaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
