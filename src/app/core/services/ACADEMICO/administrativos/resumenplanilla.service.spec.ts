import { TestBed } from '@angular/core/testing';

import { ResumenplanillaService } from './resumenplanilla.service';

describe('ResumenplanillaService', () => {
  let service: ResumenplanillaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenplanillaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
