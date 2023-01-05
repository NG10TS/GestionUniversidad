import { TestBed } from '@angular/core/testing';

import { GrupoMobiliarioService } from './grupo-mobiliario.service';

describe('GrupoMobiliarioService', () => {
  let service: GrupoMobiliarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoMobiliarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
