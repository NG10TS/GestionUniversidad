import { TestBed } from '@angular/core/testing';

import { FileEstudianteService } from './FileEstudiante.service';

describe('FileEstudianteService', () => {
  let service: FileEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
