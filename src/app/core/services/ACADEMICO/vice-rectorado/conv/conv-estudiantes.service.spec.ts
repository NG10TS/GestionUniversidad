import { TestBed } from '@angular/core/testing';

import { ConvEstudiantesService } from './conv-estudiantes.service';

describe('ConvEstudiantesService', () => {
  let service: ConvEstudiantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvEstudiantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
