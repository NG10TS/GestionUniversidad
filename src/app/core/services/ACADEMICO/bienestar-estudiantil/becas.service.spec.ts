/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BecasService } from './becas.service';

describe('Service: Becas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BecasService]
    });
  });

  it('should ...', inject([BecasService], (service: BecasService) => {
    expect(service).toBeTruthy();
  }));
});
