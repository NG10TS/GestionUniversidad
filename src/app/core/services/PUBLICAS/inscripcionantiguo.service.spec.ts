import { TestBed } from '@angular/core/testing';

import { InscripcionantiguoService } from './inscripcionantiguo.service';

describe('InscripcionantiguoService', () => {
  let service: InscripcionantiguoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionantiguoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
