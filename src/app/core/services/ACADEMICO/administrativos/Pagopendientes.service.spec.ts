import { TestBed } from '@angular/core/testing';

import { PagopendientesService } from './Pagopendientes.service';

describe('PagopendientesService', () => {
  let service: PagopendientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagopendientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
