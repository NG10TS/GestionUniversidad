import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesRegularesComponent } from './estudiantes-regulares.component';

describe('EstudiantesRegularesComponent', () => {
  let component: EstudiantesRegularesComponent;
  let fixture: ComponentFixture<EstudiantesRegularesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstudiantesRegularesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesRegularesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
