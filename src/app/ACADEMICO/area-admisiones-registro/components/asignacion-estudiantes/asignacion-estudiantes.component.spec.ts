import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionEstudiantesComponent } from './asignacion-estudiantes.component';

describe('AsignacionEstudiantesComponent', () => {
  let component: AsignacionEstudiantesComponent;
  let fixture: ComponentFixture<AsignacionEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
