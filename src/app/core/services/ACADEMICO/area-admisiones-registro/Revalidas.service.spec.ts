/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RevalidasService } from './Revalidas.service';

describe('Service: Revalidas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevalidasService]
    });
  });

  it('should ...', inject([RevalidasService], (service: RevalidasService) => {
    expect(service).toBeTruthy();
  }));
});
