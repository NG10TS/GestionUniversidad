import { TestBed } from '@angular/core/testing';

import { EstadoConvService } from './estado-conv.service';

describe('EstadoConvService', () => {
  let service: EstadoConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
