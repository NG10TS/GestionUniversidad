import { TestBed } from '@angular/core/testing';

import { MateriaOrigenService } from './materia-origen.service';

describe('MateriaOrigenService', () => {
  let service: MateriaOrigenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaOrigenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
