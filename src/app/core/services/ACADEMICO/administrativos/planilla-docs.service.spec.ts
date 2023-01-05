import { TestBed } from '@angular/core/testing';

import { PlanillaDocsService } from './planilla-docs.service';

describe('PlanillaDocsService', () => {
  let service: PlanillaDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanillaDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
