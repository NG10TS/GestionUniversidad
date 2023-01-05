import { TestBed } from '@angular/core/testing';

import { NotasEvaluasService } from './NotasEvaluas.service';

describe('NotasEvaluasService', () => {
  let service: NotasEvaluasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotasEvaluasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
