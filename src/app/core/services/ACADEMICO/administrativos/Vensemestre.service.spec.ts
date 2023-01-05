

import { TestBed } from '@angular/core/testing';

import { VensemestreService } from './Vensemestre.service';

describe('VensemestreService', () => {
  let service: VensemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VensemestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
