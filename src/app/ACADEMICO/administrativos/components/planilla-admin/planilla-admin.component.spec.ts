import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaAdminComponent } from './planilla-admin.component';

describe('PlanillaAdminComponent', () => {
  let component: PlanillaAdminComponent;
  let fixture: ComponentFixture<PlanillaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
