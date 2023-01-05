import { TestBed } from '@angular/core/testing';

import { ObligacionesEstsService } from './obligaciones-ests.service';

describe('ObligacionesEstsService', () => {
  let service: ObligacionesEstsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObligacionesEstsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
