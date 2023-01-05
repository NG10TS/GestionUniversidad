import { TestBed } from '@angular/core/testing';

import { CarreraOrigenService } from './carrera-origen.service';

describe('CarreraOrigenService', () => {
  let service: CarreraOrigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreraOrigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
