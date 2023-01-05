/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UniversidadesService } from './universidades.service';

describe('Service: Universidades', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UniversidadesService]
    });
  });

  it('should ...', inject([UniversidadesService], (service: UniversidadesService) => {
    expect(service).toBeTruthy();
  }));
});
