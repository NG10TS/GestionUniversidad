import { TestBed } from '@angular/core/testing';

import { docenteseguimineto2Service } from './docenteseguimineto2.service';

describe('docenteseguimineto2Service', () => {
  let service: docenteseguimineto2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(docenteseguimineto2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
