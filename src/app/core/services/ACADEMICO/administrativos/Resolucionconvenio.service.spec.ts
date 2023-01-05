import { TestBed } from '@angular/core/testing';

import { ResolucionconvenioService } from './Resolucionconvenio.service';

describe('ResolucionconvenioService', () => {
  let service: ResolucionconvenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolucionconvenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

