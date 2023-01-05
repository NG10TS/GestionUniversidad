import { TestBed } from '@angular/core/testing';

import { TipoObligacionesEstsService } from './tipo-obligaciones-ests.service';

describe('TipoObligacionesEstsService', () => {
  let service: TipoObligacionesEstsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoObligacionesEstsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
