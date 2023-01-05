import { TestBed } from '@angular/core/testing';

import { InscripcionesnuevosService } from './inscripcionesnuevos.service';

describe('InscripcionesnuevosService', () => {
  let service: InscripcionesnuevosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscripcionesnuevosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
