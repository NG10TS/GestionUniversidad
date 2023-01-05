/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaninscripcionService } from './planinscripcion.service';

describe('Service: Planinscripcion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaninscripcionService]
    });
  });

  it('should ...', inject([PlaninscripcionService], (service: PlaninscripcionService) => {
    expect(service).toBeTruthy();
  }));
});
