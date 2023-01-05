import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvEstudiantesComponent } from './conv-estudiantes.component';

describe('ConvEstudiantesComponent', () => {
  let component: ConvEstudiantesComponent;
  let fixture: ComponentFixture<ConvEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvEstudiantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
