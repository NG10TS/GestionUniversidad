import { TestBed } from '@angular/core/testing';

import { ArchbancosService } from './archbancos.service';

describe('ArchbancosService', () => {
  let service: ArchbancosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchbancosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
