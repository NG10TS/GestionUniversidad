import { TestBed } from '@angular/core/testing';

import { IngresoPogramaService } from './ingreso-pograma.service';

describe('IngresoPogramaService', () => {
  let service: IngresoPogramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoPogramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
