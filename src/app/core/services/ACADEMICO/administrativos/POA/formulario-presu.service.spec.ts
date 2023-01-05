import { TestBed } from '@angular/core/testing';

import { FormularioPresuService } from './formulario-presu.service';

describe('FormularioPresuService', () => {
  let service: FormularioPresuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioPresuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
