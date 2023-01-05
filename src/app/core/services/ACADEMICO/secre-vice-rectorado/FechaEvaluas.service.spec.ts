/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FechaEvaluasService } from './FechaEvaluas.service';

describe('Service: FechaEvaluas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FechaEvaluasService]
    });
  });

  it('should ...', inject([FechaEvaluasService], (service: FechaEvaluasService) => {
    expect(service).toBeTruthy();
  }));
});
