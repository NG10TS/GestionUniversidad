/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApisService } from './Apis.service';

describe('Service: Apis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApisService]
    });
  });

  it('should ...', inject([ApisService], (service: ApisService) => {
    expect(service).toBeTruthy();
  }));
});
