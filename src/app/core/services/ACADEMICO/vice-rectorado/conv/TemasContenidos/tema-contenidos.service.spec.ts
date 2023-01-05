import { TestBed } from '@angular/core/testing';

import { TemaContenidosService } from './tema-contenidos.service';

describe('TemaContenidosService', () => {
  let service: TemaContenidosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaContenidosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
