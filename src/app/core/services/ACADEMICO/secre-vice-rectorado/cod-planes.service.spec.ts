/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CodPlanesService } from './cod-planes.service';

describe('Service: CodPlanes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodPlanesService]
    });
  });

  it('should ...', inject([CodPlanesService], (service: CodPlanesService) => {
    expect(service).toBeTruthy();
  }));
});
