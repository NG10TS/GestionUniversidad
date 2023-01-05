/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EgresadosService } from './Egresados.service';

describe('Service: Egresados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgresadosService]
    });
  });

  it('should ...', inject([EgresadosService], (service: EgresadosService) => {
    expect(service).toBeTruthy();
  }));
});
