import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantedesercionComponent } from './estudiantedesercion.component';

describe('EstudiantedesercionComponent', () => {
  let component: EstudiantedesercionComponent;
  let fixture: ComponentFixture<EstudiantedesercionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantedesercionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantedesercionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
