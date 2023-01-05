import { TestBed } from '@angular/core/testing';

import { CajaChicaService } from './caja-chica.service';

describe('CajaChicaService', () => {
  let service: CajaChicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaChicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
