import { TestBed } from '@angular/core/testing';

import { ListaAlmacenesService } from './lista-almacenes.service';

describe('ListaAlmacenesService', () => {
  let service: ListaAlmacenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaAlmacenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
