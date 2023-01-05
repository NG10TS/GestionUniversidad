import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanpagoComponent } from './planpago.component';

describe('PlanpagoComponent', () => {
  let component: PlanpagoComponent;
  let fixture: ComponentFixture<PlanpagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanpagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
