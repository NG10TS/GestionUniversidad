import { TestBed } from '@angular/core/testing';

import { TipoSitService } from './tipo-sit.service';

describe('TipoSitService', () => {
  let service: TipoSitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
