import { TestBed } from '@angular/core/testing';

import { CategoriaRequerimientosService } from './categoria-requerimientos.service';

describe('CategoriaRequerimientosService', () => {
  let service: CategoriaRequerimientosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaRequerimientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
