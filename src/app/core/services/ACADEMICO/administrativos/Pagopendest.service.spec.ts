import { TestBed } from '@angular/core/testing';

import { PagopendestService } from './Pagopendest.service';

describe('PagopendestService', () => {
  let service: PagopendestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagopendestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
