/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisdocumentoService } from './regisdocumento.service';

describe('Service: Regisdocumento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisdocumentoService]
    });
  });

  it('should ...', inject([RegisdocumentoService], (service: RegisdocumentoService) => {
    expect(service).toBeTruthy();
  }));
});
