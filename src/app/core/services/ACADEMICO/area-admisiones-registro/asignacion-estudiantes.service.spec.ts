import { TestBed } from '@angular/core/testing';

import { AsignacionEstudiantesService } from './asignacion-estudiantes.service';

describe('AsignacionEstudiantesService', () => {
  let service: AsignacionEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
