import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionDocentesComponent } from './asignacion-docentes.component';

describe('AsignacionDocentesComponent', () => {
  let component: AsignacionDocentesComponent;
  let fixture: ComponentFixture<AsignacionDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
