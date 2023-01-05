import { TestBed } from '@angular/core/testing';

import { docenteseguiminetoService } from './docenteseguimineto.service';

describe('docenteseguiminetoService', () => {
  let service: docenteseguiminetoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(docenteseguiminetoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
