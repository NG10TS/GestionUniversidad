import { TestBed } from '@angular/core/testing';

import { CateProductoPoaService } from './cate-producto-poa.service';

describe('CateProductoPoaService', () => {
  let service: CateProductoPoaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CateProductoPoaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
