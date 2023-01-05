import { TestBed } from '@angular/core/testing';

import { AnalisisFodaService } from './analisis-foda.service';

describe('AnalisisFodaService', () => {
  let service: AnalisisFodaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisFodaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
