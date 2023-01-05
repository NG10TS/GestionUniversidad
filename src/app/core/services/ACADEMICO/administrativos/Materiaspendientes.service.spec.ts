
import { TestBed } from '@angular/core/testing';

import { MateriaspendientesService } from './Materiaspendientes.service';

describe('MateriaspendientesService', () => {
  let service: MateriaspendientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaspendientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
