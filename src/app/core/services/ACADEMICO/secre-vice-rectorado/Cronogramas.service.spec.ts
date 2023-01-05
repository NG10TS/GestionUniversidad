/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CronogramasService } from './Cronogramas.service';

describe('Service: Cronogramas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CronogramasService]
    });
  });

  it('should ...', inject([CronogramasService], (service: CronogramasService) => {
    expect(service).toBeTruthy();
  }));
});
