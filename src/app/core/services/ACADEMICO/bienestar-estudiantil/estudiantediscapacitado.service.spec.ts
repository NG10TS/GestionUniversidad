import { TestBed } from '@angular/core/testing';

import { EstudiantediscapacitadoService } from './estudiantediscapacitado.service';

describe('EstudiantediscapacitadoService', () => {
  let service: EstudiantediscapacitadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiantediscapacitadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
