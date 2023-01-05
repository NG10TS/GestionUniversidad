/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConvalidacionesService } from './Convalidaciones.service';

describe('Service: Convalidaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvalidacionesService]
    });
  });

  it('should ...', inject([ConvalidacionesService], (service: ConvalidacionesService) => {
    expect(service).toBeTruthy();
  }));
});
