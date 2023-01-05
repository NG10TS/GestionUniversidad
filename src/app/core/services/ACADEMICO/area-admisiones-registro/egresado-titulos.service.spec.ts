/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EgresadoTitulosService } from './egresado-titulos.service';

describe('Service: EgresadoTitulos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgresadoTitulosService]
    });
  });

  it('should ...', inject([EgresadoTitulosService], (service: EgresadoTitulosService) => {
    expect(service).toBeTruthy();
  }));
});
