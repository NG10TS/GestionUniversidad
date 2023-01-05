import { TestBed } from '@angular/core/testing';

import { EstudiantesRegularesService } from './estudiantes-regulares.service';

describe('EstudiantesRegularesService', () => {
  let service: EstudiantesRegularesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudiantesRegularesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
