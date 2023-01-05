import { TestBed } from '@angular/core/testing';

import { CuentaBancosService } from './cuenta-bancos.service';

describe('CuentaBancosService', () => {
  let service: CuentaBancosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentaBancosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
