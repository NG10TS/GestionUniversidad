/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalendariosService } from './Calendarios.service';

describe('Service: Calendarios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendariosService]
    });
  });

  it('should ...', inject([CalendariosService], (service: CalendariosService) => {
    expect(service).toBeTruthy();
  }));
});
