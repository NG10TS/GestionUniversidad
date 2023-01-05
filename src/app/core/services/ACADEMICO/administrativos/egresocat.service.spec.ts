import { TestBed } from '@angular/core/testing';

import { EgresocatService } from './egresocat.service';

describe('EgresocatService', () => {
  let service: EgresocatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresocatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
