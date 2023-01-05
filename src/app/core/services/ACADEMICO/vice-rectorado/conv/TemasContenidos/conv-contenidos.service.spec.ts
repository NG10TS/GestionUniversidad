import { TestBed } from '@angular/core/testing';

import { ConvContenidosService } from './conv-contenidos.service';

describe('ConvContenidosService', () => {
  let service: ConvContenidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvContenidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
