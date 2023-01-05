import { TestBed } from '@angular/core/testing';

import { EstudianteabandonoService } from './estudianteabandono.service';

describe('EstudianteabandonoService', () => {
  let service: EstudianteabandonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteabandonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
