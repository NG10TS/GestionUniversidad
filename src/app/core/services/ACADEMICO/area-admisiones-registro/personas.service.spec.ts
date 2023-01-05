/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PersonasService } from './personas.service';

describe('Service: Personas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonasService]
    });
  });

  it('should ...', inject([PersonasService], (service: PersonasService) => {
    expect(service).toBeTruthy();
  }));
});
