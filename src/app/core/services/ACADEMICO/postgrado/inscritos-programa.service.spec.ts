import { TestBed } from '@angular/core/testing';

import { InscritosProgramaService } from './inscritos-programa.service';

describe('InscritosProgramaService', () => {
  let service: InscritosProgramaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscritosProgramaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
