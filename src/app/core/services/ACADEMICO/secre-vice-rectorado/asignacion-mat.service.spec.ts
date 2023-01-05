import { TestBed } from '@angular/core/testing';

import { AsignacionMatService } from './asignacion-mat.service';

describe('AsignacionMatService', () => {
  let service: AsignacionMatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionMatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
