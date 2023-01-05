/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstudiantebecaService } from './estudiantebeca.service';

describe('Service: Estudiantebeca', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstudiantebecaService]
    });
  });

  it('should ...', inject([EstudiantebecaService], (service: EstudiantebecaService) => {
    expect(service).toBeTruthy();
  }));
});
