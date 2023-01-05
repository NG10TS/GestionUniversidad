import { TestBed } from '@angular/core/testing';

import { AsignacionmatService } from './asignacionmat.service';

describe('AsignacionmatService', () => {
  let service: AsignacionmatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignacionmatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
