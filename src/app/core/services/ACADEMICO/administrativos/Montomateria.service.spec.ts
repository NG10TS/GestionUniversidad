import { TestBed } from '@angular/core/testing';

import { MontomateriaService } from './Montomateria.service';

describe('MontomateriaService', () => {
  let service: MontomateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontomateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
