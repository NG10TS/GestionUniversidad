import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlandeudaComponent } from './plandeuda.component';

describe('PlandeudaComponent', () => {
  let component: PlandeudaComponent;
  let fixture: ComponentFixture<PlandeudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlandeudaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlandeudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
