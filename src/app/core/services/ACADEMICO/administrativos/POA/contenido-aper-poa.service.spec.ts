import { TestBed } from '@angular/core/testing';

import { ContenidoAperPoaService } from './contenido-aper-poa.service';

describe('ContenidoAperPoaService', () => {
  let service: ContenidoAperPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenidoAperPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
