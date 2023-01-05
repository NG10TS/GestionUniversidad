import { TestBed } from '@angular/core/testing';

import { CategoriaEgresosService } from './categoria-egresos.service';

describe('CategoriaEgresosService', () => {
  let service: CategoriaEgresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaEgresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
