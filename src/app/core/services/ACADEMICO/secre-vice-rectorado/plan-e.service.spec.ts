/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanEService } from './plan-e.service';

describe('Service: PlanE', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanEService]
    });
  });

  it('should ...', inject([PlanEService], (service: PlanEService) => {
    expect(service).toBeTruthy();
  }));
});
