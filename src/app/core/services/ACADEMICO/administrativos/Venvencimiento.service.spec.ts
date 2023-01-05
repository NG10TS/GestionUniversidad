import { TestBed } from '@angular/core/testing';

import { VenvencimientoService } from './Venvencimiento.service';

describe('VenvencimientoService', () => {
  let service: VenvencimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenvencimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
