import { TestBed } from '@angular/core/testing';

import { ConvTemasService } from './conv-temas.service';

describe('ConvTemasService', () => {
  let service: ConvTemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvTemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
