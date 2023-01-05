/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisDocumentoDetalleService } from './regisDocumentoDetalle.service';

describe('Service: RegisDocumentoDetalle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisDocumentoDetalleService]
    });
  });

  it('should ...', inject([RegisDocumentoDetalleService], (service: RegisDocumentoDetalleService) => {
    expect(service).toBeTruthy();
  }));
});
