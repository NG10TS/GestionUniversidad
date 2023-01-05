import { TestBed } from '@angular/core/testing';

import { AperturaProgPoaService } from './apertura-prog-poa.service';

describe('AperturaProgPoaService', () => {
  let service: AperturaProgPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AperturaProgPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
