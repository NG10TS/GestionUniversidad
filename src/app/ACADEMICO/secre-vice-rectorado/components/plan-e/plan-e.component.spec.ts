import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanEComponent } from './plan-e.component';

describe('PlanEComponent', () => {
  let component: PlanEComponent;
  let fixture: ComponentFixture<PlanEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
