import { TestBed } from '@angular/core/testing';

import { DeudasService } from './Deudas.service';

describe('DeudasService', () => {
  let service: DeudasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeudasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
