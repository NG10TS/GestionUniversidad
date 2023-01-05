import { TestBed } from '@angular/core/testing';

import { EvaluacionProgramaService } from './evaluacion-programa.service';

describe('EvaluacionProgramaService', () => {
  let service: EvaluacionProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluacionProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
