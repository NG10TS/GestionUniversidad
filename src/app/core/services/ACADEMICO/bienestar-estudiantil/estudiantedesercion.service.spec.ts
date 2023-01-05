/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstudiantedesercionService } from './estudiantedesercion.service';

describe('Service: Estudiantedesercion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstudiantedesercionService]
    });
  });

  it('should ...', inject([EstudiantedesercionService], (service: EstudiantedesercionService) => {
    expect(service).toBeTruthy();
  }));
});
