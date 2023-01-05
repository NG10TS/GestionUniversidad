import { TestBed } from '@angular/core/testing';

import { ConvRegistrarService } from './conv-registrar.service';

describe('ConvRegistrarService', () => {
  let service: ConvRegistrarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvRegistrarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
