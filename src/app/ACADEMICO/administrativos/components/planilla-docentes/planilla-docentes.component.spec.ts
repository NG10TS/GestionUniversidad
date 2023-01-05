import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaDocentesComponent } from './planilla-docentes.component';

describe('PlanillaDocentesComponent', () => {
  let component: PlanillaDocentesComponent;
  let fixture: ComponentFixture<PlanillaDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanillaDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
