import { TestBed } from '@angular/core/testing';

import { CronogramaActPoaService } from './cronograma-act-poa.service';

describe('CronogramaActPoaService', () => {
  let service: CronogramaActPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronogramaActPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
