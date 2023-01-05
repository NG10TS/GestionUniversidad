import { TestBed } from '@angular/core/testing';

import { ConveniotrabajoService } from './conveniotrabajo.service';

describe('ConveniotrabajoService', () => {
  let service: ConveniotrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConveniotrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
