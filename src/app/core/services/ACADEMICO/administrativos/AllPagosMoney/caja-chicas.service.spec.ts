import { TestBed } from '@angular/core/testing';

import { CajaChicasService } from './caja-chicas.service';

describe('CajaChicasService', () => {
  let service: CajaChicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaChicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
