/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetalleCalendariosService } from './DetalleCalendarios.service';

describe('Service: DetalleCalendarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalleCalendariosService]
    });
  });

  it('should ...', inject([DetalleCalendariosService], (service: DetalleCalendariosService) => {
    expect(service).toBeTruthy();
  }));
});
