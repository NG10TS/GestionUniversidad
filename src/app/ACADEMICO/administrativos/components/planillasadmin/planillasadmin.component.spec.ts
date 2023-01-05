import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillasadminComponent } from './planillasadmin.component';

describe('PlanillasadminComponent', () => {
  let component: PlanillasadminComponent;
  let fixture: ComponentFixture<PlanillasadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillasadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillasadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
