import { TestBed } from '@angular/core/testing';

import { RegistroCajaChicaService } from './registro-caja-chica.service';

describe('RegistroCajaChicaService', () => {
  let service: RegistroCajaChicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroCajaChicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
