/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CongeladosService } from './Congelados.service';

describe('Service: Congelados', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CongeladosService]
    });
  });

  it('should ...', inject([CongeladosService], (service: CongeladosService) => {
    expect(service).toBeTruthy();
  }));
});
