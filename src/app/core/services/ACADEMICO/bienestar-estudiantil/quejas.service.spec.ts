/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuejasService } from './quejas.service';

describe('Service: Quejas', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuejasService]
    });
  });

  it('should ...', inject([QuejasService], (service: QuejasService) => {
    expect(service).toBeTruthy();
  }));
});
