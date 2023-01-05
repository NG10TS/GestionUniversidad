/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VincularContenidosService } from './VincularContenidos.service';

describe('Service: VincularContenidos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VincularContenidosService]
    });
  });

  it('should ...', inject([VincularContenidosService], (service: VincularContenidosService) => {
    expect(service).toBeTruthy();
  }));
});
