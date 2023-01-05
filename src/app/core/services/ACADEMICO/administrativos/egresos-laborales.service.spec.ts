import { TestBed } from '@angular/core/testing';

import { EgresosLaboralesService } from './egresos-laborales.service';

describe('EgresosLaboralesService', () => {
  let service: EgresosLaboralesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EgresosLaboralesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
