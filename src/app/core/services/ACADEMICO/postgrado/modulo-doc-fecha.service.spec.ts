import { TestBed } from '@angular/core/testing';

import { ModuloDocFechaService } from './modulo-doc-fecha.service';

describe('ModuloDocFechaService', () => {
  let service: ModuloDocFechaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuloDocFechaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
