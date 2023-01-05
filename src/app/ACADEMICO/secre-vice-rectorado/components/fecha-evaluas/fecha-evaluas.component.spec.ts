import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaEvaluasComponent } from './fecha-evaluas.component';

describe('FechaEvaluasComponent', () => {
  let component: FechaEvaluasComponent;
  let fixture: ComponentFixture<FechaEvaluasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaEvaluasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaEvaluasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
